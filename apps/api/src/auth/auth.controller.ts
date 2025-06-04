import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateShopDto } from '../shops/dto/create-shop.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedRequest } from '../@types/types';
import { User } from '../users/entities/user.entity';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'It will return the user in the response',
  })
  signup(
    @Body() userDTO: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    return this.authService.create(userDTO);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register-shops')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  createShop(
    @Body() createShopDto: CreateShopDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.authService.createShop(createShopDto, req.user.email, file);
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async authorize(@Request() req: AuthenticatedRequest) {
    return await this.authService.getMe(req.user.email);
  }

  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(@Request() req) {
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Request() req,
    @Body() tokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(req.user.userId, tokenDTO.token);
  }

  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(@Request() req: AuthenticatedRequest): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }

  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(@Request() req) {
    delete req.user.password;
    return {
      msg: 'authenticated with api key',
      user: req.user,
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googlelogin() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    const { token } = await this.authService.loginWithGoogle(req);
    res.redirect(`${process.env.CALLBACK_URL}/callback/${token}`);
  }
}
