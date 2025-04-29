import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ResourceFilesService } from './resource-files.service';
import { UpdateResourceFileDto } from './dto/update-resource-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtShopGuard } from 'src/auth/guard/jwt-shop.guard';

@Controller('resource-files')
export class ResourceFilesController {
  constructor(private readonly resourceFilesService: ResourceFilesService) {}

  @Post()
  @UseGuards(JwtShopGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createResourceFileDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.resourceFilesService.create(createResourceFileDto, file);
  }

  @Get()
  findAll() {
    return this.resourceFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceFilesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtShopGuard)
  update(
    @Param('id') id: string,
    @Body() updateResourceFileDto: UpdateResourceFileDto,
  ) {
    return this.resourceFilesService.update(+id, updateResourceFileDto);
  }

  @Delete(':id')
  @UseGuards(JwtShopGuard)
  remove(@Param('id') id: string) {
    return this.resourceFilesService.remove(+id);
  }
}
