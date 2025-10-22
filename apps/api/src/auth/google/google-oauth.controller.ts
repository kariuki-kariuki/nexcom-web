import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './google-oauth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { Response } from 'express';
import { AuthenticatedRequest, SESSION_COOKIE_KEY } from '../../@types/types';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie(SESSION_COOKIE_KEY, accessToken, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
    });
    return res.redirect('http://localhost:3500');
  }
}
