import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../../@types/chat/chat';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: User) {
    const payload: Payload = {
      email: user.email,
      userId: user.id,
      shopId: user.shop?.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
