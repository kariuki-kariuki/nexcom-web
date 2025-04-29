import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BlogImagesService } from './blog-images.service';
import { CreateBlogImageDto } from './dto/create-blog-image.dto';
import { UpdateBlogImageDto } from './dto/update-blog-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blog-images')
export class BlogImagesController {
  constructor(private readonly blogImagesService: BlogImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  create(
    @Body() createBlogImageDto: CreateBlogImageDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.blogImagesService.create(createBlogImageDto, files);
  }

  @Get()
  findAll() {
    return this.blogImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogImageDto: UpdateBlogImageDto,
  ) {
    return this.blogImagesService.update(+id, updateBlogImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogImagesService.remove(+id);
  }
}
