import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import {
  CreateConversationDTO,
  CreateGroupDTO,
  AddRemoveAdminDTO,
  UpdateGroupProfileDto,
  AddGroupMembersDTO,
} from './conversations/dto/create-conversation.dto';
import { UpdateStateDTO } from './messages/dto/update-state.dto';
import { instanceToPlain } from 'class-transformer';
import { GatewaySessionManager } from './gateway.session';
import {
  IncomingCall,
  IncomingMessageBody,
  OnlineStatus,
} from './dto/chat-gateway.dto';
import { Logger } from '@nestjs/common';
import { Conversation } from './conversations/entities/Conversation.entity';
import { AuthenticatedSocket } from '../@types/chat/chat';
import { ChatGroupsService } from './chat-groups.services';

@WebSocketGateway(5000, {
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger(ChatGateway.name);
  constructor(
    private readonly chatService: ChatService,
    private readonly gateWaySession: GatewaySessionManager,
    private readonly chatGroupsService: ChatGroupsService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    const { userId } = client.user;
    this.gateWaySession.setUserSocket(userId, client);
    this.server.emit('online-status', { userId, status: 'online' });
  }

  handleDisconnect(client: AuthenticatedSocket) {
    const { userId } = client.user;
    this.gateWaySession.removeUserSocket(userId);
    this.server.emit('online-status', { userId, status: 'offline' });
  }

  @SubscribeMessage('message-state')
  async handleMessageState(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() stateBody: UpdateStateDTO,
  ) {
    const res = await this.chatService.updateMessageState(
      stateBody,
      client.user.email,
    );
    const receiverSocket = this.gateWaySession.getUserSocket(
      stateBody.receiverId,
    );
    try {
      if (receiverSocket) {
        this.server.to(receiverSocket.id).emit('message-state', res);
      } else {
        console.log('user ofline');
      }
    } catch (e) {
      console.log(e);
    }
    return res;
  }

  @SubscribeMessage('new-group')
  async handleNewGroup(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() createGroupDto: CreateGroupDTO,
  ) {
    const { userId } = client.user;
    const res = await this.chatGroupsService.newGroup(userId, createGroupDto);
    const serialRes = instanceToPlain(res);
    res.users.forEach((user) => {
      const userSocket = this.gateWaySession.getUserSocket(user.id);
      if (userSocket) {
        this.server.to(userSocket.id).emit('new-conversation', serialRes);
      }
    });
  }

  @SubscribeMessage('add-group-members')
  async handleAddGroupMembers(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() messageBody: AddGroupMembersDTO,
  ) {
    const { userId: adminId } = client.user;
    const { groupId } = messageBody;
    const { newUsers, savedGroup, users } =
      await this.chatGroupsService.addGroupMembers(adminId, messageBody);
    const plainUsers = instanceToPlain(newUsers);
    users.forEach((user) => {
      const userSocket = this.gateWaySession.getUserSocket(user.id);
      if (userSocket) {
        this.server.to(userSocket.id).emit('add-group-members', {
          groupId,
          users: plainUsers,
        });
      }
    });

    newUsers.forEach((user) => {
      const userSocket = this.gateWaySession.getUserSocket(user.id);
      if (userSocket) {
        this.server.to(userSocket.id).emit('new-conversation', savedGroup);
      }
    });
  }

  @SubscribeMessage('add-group-admin')
  async handleAddAdmin(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() messageBody: AddRemoveAdminDTO,
  ) {
    const { userId: adminId } = client.user;
    const { groupId } = messageBody;

    const { users, user } = await this.chatGroupsService.addGroupAdmin(
      adminId,
      messageBody,
    );
    users.forEach((usr) => {
      const userSocket = this.gateWaySession.getUserSocket(usr.id);
      if (userSocket) {
        this.server
          .to(userSocket.id)
          .emit('add-group-admin', { groupId, user });
      }
    });
  }

  @SubscribeMessage('remove-group-admin')
  async handleRemoveAdmin(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() messageBody: AddRemoveAdminDTO,
  ) {
    const { userId: moderatorId } = client.user;
    const { userId: adminId, groupId } = messageBody;

    const { users } = await this.chatGroupsService.removeAdmin(
      moderatorId,
      messageBody,
    );
    users.forEach((user) => {
      const userSocket = this.gateWaySession.getUserSocket(user.id);
      if (userSocket) {
        this.server
          .to(userSocket.id)
          .emit('remove-group-admin', { groupId, userId: adminId });
      }
    });
  }

  @SubscribeMessage('new-conversation')
  async handleNewConversation(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() createConversationDTO: CreateConversationDTO,
  ) {
    try {
      const { receiverId } = createConversationDTO;
      const { userId } = client.user;

      // Create the conversation
      const conversation = await this.chatService.newConversation({
        initiatorId: userId,
        createConversationDTO,
      });

      // Notify the receiver if they are online
      const receiverSocket = this.gateWaySession.getUserSocket(receiverId);
      if (receiverSocket) {
        this.server
          .to(receiverSocket.id)
          .emit(
            'new-conversation',
            this.serializeConversation(conversation, receiverId),
          );
      }

      // Return conversation filtered for the initiator
      return this.serializeConversation(conversation, userId);
    } catch (error) {
      this.logger.error('Create conversation error:', error.message);
      throw new WsException('Failed to create a new conversation');
    }
  }

  @SubscribeMessage('online-status')
  async onlineStatus(@MessageBody() body: { userId: string }) {
    const receiverSocket = this.gateWaySession.getUserSocket(body.userId);

    if (receiverSocket) {
      return { status: 'online' };
    }
    return { status: 'offline' };
  }

  private serializeConversation(conversation: Conversation, userId: string) {
    const serializedConversation = instanceToPlain(conversation);
    serializedConversation.users = serializedConversation.users.filter(
      (user: any) => user.id !== userId,
    );
    return serializedConversation;
  }

  @SubscribeMessage('updateProfile')
  async uploadProfileImage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { file?: Express.Multer.File; status: string },
  ) {
    const { userId } = client.user;
    try {
      const res = await this.chatService.updateProfile(
        userId,
        data.status,
        data.file,
      );
      const plainUser = instanceToPlain(res);
      this.server.emit('updateProfile', { user: plainUser, userId });
      return plainUser;
    } catch (e) {
      console.log('Failed to update', e);
    }
  }

  @SubscribeMessage('callUser')
  handleCallUser(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() messageBody: IncomingCall,
  ) {
    const { signalData, receiverId } = messageBody;
    const { userId } = client.user;
    const receiverSocket = this.gateWaySession.getUserSocket(receiverId);

    if (!receiverSocket) {
      return { message: OnlineStatus.OFFLINE };
    }

    this.server
      .to(receiverSocket.id)
      .emit('callUser', { callerId: userId, signalData });

    console.log(messageBody.signalData);
  }

  @SubscribeMessage('group-profile-update')
  async handleGroupProfile(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    messageBody: UpdateGroupProfileDto,
  ) {
    const { userId } = client.user;
    const { users, profile, groupId } =
      await this.chatGroupsService.updateGroupProfile(userId, messageBody);

    users.forEach((user) => {
      const userSocket = this.gateWaySession.getUserSocket(user.id);
      if (userSocket) {
        this.server
          .to(userSocket.id)
          .emit('group-profile-update', { profile, groupId });
      }
    });
    return { status: true };
  }

  @SubscribeMessage('message')
  async handleNewMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() messageBody: IncomingMessageBody,
  ) {
    const { userId } = client.user;
    try {
      const receiverSocket = this.gateWaySession.getUserSocket(
        messageBody.receiverId,
      );

      if (messageBody.groupId) {
        const { users, message } = await this.chatGroupsService.groupMessage(
          messageBody,
          userId,
        );
        const plainMessage = instanceToPlain(message);

        users
          .filter((user) => user.id !== userId)
          .forEach((user) => {
            const userSocket = this.gateWaySession.getUserSocket(user.id);
            if (userSocket) {
              this.server.to(userSocket.id).emit('message', plainMessage);
            }
          });

        return plainMessage;
      }
      const savedMessage = await this.chatService.newMessage(
        messageBody,
        userId,
      );

      const serializedMessage = instanceToPlain(savedMessage);
      if (receiverSocket) {
        this.server.to(receiverSocket.id).emit('message', serializedMessage);
      }
      return serializedMessage;
    } catch (e) {
      console.log(e);
    }
  }

  @SubscribeMessage('join')
  handleJoinRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() body: unknown,
  ) {
    body;
    console.log('New Client', client.user.email);
  }
}
