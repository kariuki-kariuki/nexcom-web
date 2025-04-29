import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserRoles } from 'src/@types/types';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'utils/roles.decorator';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createImageDto: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.imagesService.create(createImageDto, files);
  }

  @Get()
  findAll() {
    // return this.imagesService.findAll();
  }

  @Get('add-weaviate')
  addToWeaviate() {
    return this.imagesService.addAllToWeaviate();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }
}
