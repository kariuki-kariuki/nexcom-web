import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Roles } from '../../utils/roles.decorator';
import { AuthenticatedRequest, UserRoles } from '../@types/types';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindPublicBlogsDto } from './dto/find-public-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createBlogDto: any,
    @UploadedFile() featuredImage: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    console.log('Featured Image', featuredImage);
    return this.blogsService.create(createBlogDto, featuredImage, req.user.id);
  }
  @Get('public/:id')
  async findOnePublic(@Param('id') id: string) {
    return this.blogsService.findOnePublic(id);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findMyBlogs(
    @Query() query: FindPublicBlogsDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.blogsService.findMyBlogs(req.user.id, query);
  }
  @Get('my/:id')
  @UseGuards(JwtAuthGuard)
  async findOneEditable(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.blogsService.findOneEditable(id, req.user.id);
  }

  @Get('public')
  findAllPublic(@Query() query: FindPublicBlogsDto) {
    return this.blogsService.findAllPublic(query);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @Roles(UserRoles.SHOP_ADMIN, UserRoles.USER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
