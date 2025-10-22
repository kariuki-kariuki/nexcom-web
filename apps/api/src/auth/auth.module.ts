import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ApiKeyStrategy } from './jwt/api-key.strategy';
import { ShopsModule } from '../shops/shops.module';
import { UsersModule } from '../users/users.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { GoogleOauthModule } from './google/google-oauth.module';

@Module({
  imports: [UsersModule, ShopsModule, JwtAuthModule, GoogleOauthModule],
  controllers: [AuthController],
  providers: [AuthService, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
