import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchUserDto } from './dto/search-users.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/@types/types';
import { MessageBody } from '@nestjs/websockets';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthenticatedRequest,
    @MessageBody() body: { status: string },
  ) {
    if (file) {
      console.log(file.mimetype);
      return await this.usersService.updateProfile(
        req.user.userId,
        body.status,
        file,
      );
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard)
  search(@Body() searchDto: SearchUserDto) {
    return this.usersService.searchUser(searchDto);
  }
}
