import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ApiKeyStrategy } from './jwt/api-key.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './jwt/google.strategy';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [
    UsersModule,
    ShopsModule,
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
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
