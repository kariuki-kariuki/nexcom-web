import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-gateways';
import { UsersModule } from 'src/users/users.module';
import { ChatService } from './chat.service';
import { ConversationsModule } from './conversations/conversations.module';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { GatewaySessionManager } from './gateway.session';
import { SessionsModule } from 'src/sessions/sessions.module';
import { WebSocketAdapter } from './gateway.adpater';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
})
export class ChatsModule {}
