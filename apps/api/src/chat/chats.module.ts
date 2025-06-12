import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-gateways';
import { ChatService } from './chat.service';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { GatewaySessionManager } from './gateway.session';
import { WebSocketAdapter } from './gateway.adpater';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { ChatGroupsService } from './chat-groups.services';

@Module({
  imports: [
    UsersModule,
    ConversationsModule,
    AuthModule,
    MessagesModule,
    SessionsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: '3d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    ChatGateway,
    ChatService,
    GatewaySessionManager,
    WebSocketAdapter,
    ChatGroupsService,
  ],
})
export class ChatsModule {}
