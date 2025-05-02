import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
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
      console.log(client.user.userId);
      const { receiverId } = createConversationDTO;
      const conversation = await this.chatService.newConversation({
        initiatorId: client.user.userId,
        createConversationDTO,
      });
      const receiverSocket = this.gateWaySession.getUserSocket(receiverId);
      if (receiverSocket) {
        const serializedConversation = instanceToPlain(conversation);

        serializedConversation.users = conversation.users.filter(
          (user) => user.id !== receiverId,
        );
        this.server
          .to(receiverSocket.id)
          .emit('new-conversation', serializedConversation);
      }
      const serializedConversation = instanceToPlain(conversation);
      serializedConversation.users = conversation.users.filter(
        (user) => user.id === receiverId,
      );
      return serializedConversation;
    } catch (e) {
      console.log('Create conversation error', e);
    }
  }

  @SubscribeMessage('updateProfile')
  async uploadProfileImage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { file: Express.Multer.File; message: string },
  ) {
    const { userId } = client.user;
    try {
      const res = await this.chatService.updateProfile(data.file, userId);
      this.server.emit('updateProfile', { user: res, userId });
      return res;
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
