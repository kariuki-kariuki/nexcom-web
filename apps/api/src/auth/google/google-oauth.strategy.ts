import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly usersSevice: UsersService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_OAUTH_API_ID'),
      clientSecret: configService.get<string>('GOOGLE_OAUTH_API_SECRET'),
      callbackURL: configService.get<string>('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails } = profile;
    let user = await this.usersRepository.findOne({
      where: { provider: 'google', providerId: id },
      relations: { shop: true },
    });

    if (!user) {
      user = await this.usersSevice.createGoogle({
        providerId: id,
        firstName: name.givenName,
        lastName: name.familyName,
        email: emails[0].value,
      });
    }

    return user;
  }
}
