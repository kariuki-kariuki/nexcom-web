import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';
import { ShopsService } from '../shops/shops.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateShopDto } from '../shops/dto/create-shop.dto';
import { Enable2FA, Payload } from 'src/@types/chat/chat';

export interface GoogleUser {
  firstName: string;
  email: string;
  lastName: string;
}
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly shopService: ShopsService,
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async create(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    const payload: Payload = {
      email: user.email,
      userId: user.id,
    };
    const token = await this.signedPayLoad(payload);
    return { ...token, user };
  }

  async createShop(
    createShopDto: CreateShopDto,
    email: string,
    file: Express.Multer.File,
  ) {
    const shop = await this.shopService.create(createShopDto, email, file);
    const payload: Payload = {
      email: shop.user.email,
      userId: shop.user.id,
      shopId: shop.id,
    };
    const token = await this.signedPayLoad(payload);
    return { name: shop.name, id: shop.id, token: token.token };
  }

  async getMe(email: string) {
    const user = await this.userService.findOne(email);
    return user;
  }

  async loginWithGoogle(req: any) {
    const email = req.user.emails[0].value;
    const user: User = await this.userService.findOne(email);
    if (!user) {
      const guser: GoogleUser = {
        firstName: req.user.name.givenName,
        lastName: req.user.name.familyName,
        email,
      };

      const res = await this.userService.createGoogle(guser);
      if (res) {
        const payload: Payload = { email: res.email, userId: res.id };
        return this.signedPayLoad(payload);
      }
    }

    if (user) {
      const payload: Payload = {
        email: user.email,
        userId: user.id,
      };
      const shop = await this.shopService.findMyShop(user.id);

      if (shop) {
        payload.shopId = shop.id;
      }
      return this.signedPayLoad(payload);
    }
  }

  async login(loginDto: LoginDto) {
    const user: User = await this.userService.findOne(loginDto.email);
    this.logger.log(user);
    if (!user) {
      throw new UnauthorizedException('Incorect email or password');
    }
    const payload: Payload = { email: user.email, userId: user.id };
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (passwordMatch) {
      const shop = await this.shopService.findUserShop(user.id);

      if (shop) {
        payload.shopId = shop.id;
      }

      if (user.enable2FA && user.twoFAsecret) {
        return {
          link: 'http://localhost:3000/auth/validate-2fa',
          message:
            'Please send the one time passsword/token from your google Authenticator App',
        };
      }
      const token = await this.signedPayLoad(payload);
      return { ...token, user };
    } else {
      throw new UnauthorizedException('wrong password or email');
    }
  }

  async signedPayLoad(payLoad: Payload) {
    return { token: this.jwtService.sign(payLoad) };
  }

  async enable2FA(userId: string): Promise<Enable2FA> {
    const user = await this.userService.findById(userId);
    if (user.enable2FA) {
      return { secret: user.twoFAsecret };
    }

    const secret = speakeasy.generateSecret().base32;
    await this.userService.updateSecreteKey(userId, secret);
    return { secret: secret };
  }

  async validate2FAToken(id: string, token: string) {
    try {
      // find the user based on id
      const user = await this.userService.findById(id);

      // extract 2fa secrete
      const secret = user.twoFAsecret;
      const verified = speakeasy.totp.verify({
        secret: secret,
        token: token,
        encoding: 'base32',
      });

      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (err) {
      throw new UnauthorizedException('Error veryfying token');
    }
  }

  async disable2FA(userId: string): Promise<UpdateResult> {
    return await this.userService.disable2FA(userId);
  }

  async validateUserByApiKey(apiKey: string) {
    const user = await this.userService.findByApiKey(apiKey);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }

  async verifyToken(token: string) {
    const user = this.jwtService.verifyAsync(token);
    return user;
  }
}
