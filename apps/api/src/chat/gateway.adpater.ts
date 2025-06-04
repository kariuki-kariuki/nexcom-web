import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket } from 'socket.io';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { AuthenticatedSocket } from '../@types/chat/chat';

@Injectable()
export class WebSocketAdapter extends IoAdapter {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);

    server.use(async (socket: AuthenticatedSocket, next) => {
      try {
        const token = this.extractTokenFromClient(socket);
        if (!token) {
          console.error('Token not found in handshake headers');
          throw new UnauthorizedException('Unauthorized');
        }

        // Verify and decode token
        const decoded = await this.jwtService.verifyAsync(token);

        // Optionally attach user data to the socket
        socket.user = decoded; // Assuming `AuthenticatedSocket` has a `user` property
        next();
      } catch (error) {
        console.error('Authentication error:', error.message || error);
        next(new Error('Unauthorized'));
      }
    });

    return server;
  }

  private extractTokenFromClient(client: Socket): string | null {
    const authHeader = client.handshake.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    throw new WsException('Forbiden');
  }
}
