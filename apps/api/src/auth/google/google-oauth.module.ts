import { Module } from '@nestjs/common';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [JwtAuthModule, TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
