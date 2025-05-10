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
import { CreateConversationDTO } from './conversations/dto/create-conversation.dto';
import { UpdateStateDTO } from './messages/dto/update-state.dto';
import { instanceToPlain } from 'class-transformer';
import { AuthenticatedSocket } from 'src/@types/chat/chat';
import { GatewaySessionManager } from './gateway.session';
import {
  IncomingCall,
  IncomingMessageBody,
  OnlineStatus,
} from './dto/chat-gateway.dto';
import { Logger } from '@nestjs/common';
import { Conversation } from './conversations/entities/Conversation.entity';

@WebSocketGateway(5000, {
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger(ChatGateway.name);
  constructor(
    private readonly chatService: ChatService,
    private readonly gateWaySession: GatewaySessionManager,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    this.gateWaySession.setUserSocket(client.user.userId, client);
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.server.emit('user-left', {
      message: `User left the chat: ${client.id}`,
    });
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

  @SubscribeMessage('new-conversation')
  async handleNewConversation(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() createConversationDTO: CreateConversationDTO,
  ) {
    try {
      this.logger.log(
        `Creating conversation with receiverId: ${createConversationDTO.receiverId}`,
      );
      const { receiverId } = createConversationDTO;

      // Create the conversation
      const conversation = await this.chatService.newConversation({
        initiatorId: client.user.userId,
        createConversationDTO,
      });

      // Notify the receiver if they are online
      const receiverSocket = this.gateWaySession.getUserSocket(receiverId);
      if (receiverSocket) {
        const serializedForReceiver = this.serializeConversation(
          conversation,
          receiverId,
        );
        this.server
          .to(receiverSocket.id)
          .emit('new-conversation', serializedForReceiver);
      }

      // Return conversation filtered for the initiator
      return this.serializeConversation(conversation, receiverId);
    } catch (error) {
      this.logger.error('Create conversation error:', error.message);
      throw new WsException('Failed to create a new conversation');
    }
  }

  private serializeConversation(
    conversation: Conversation,
    excludeUserId: string,
  ) {
    const serialized = instanceToPlain(conversation);
    serialized.users = conversation.users.filter(
      (user) => user.id !== excludeUserId,
    );
    return serialized;
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
