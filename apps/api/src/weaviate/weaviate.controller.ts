import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { WeaviateService } from './weaviate.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { toBase64FromMedia } from 'weaviate-client';
import { v4 as uuid } from 'uuid';

@Controller('weaviate')
export class WeaviateController {
  constructor(private readonly weaviateService: WeaviateService) {}

  @Get()
  async getSchema() {
    return await this.weaviateService.findCollectionName('ProductsCollection');
  }

  @Get('buffer')
  buffer() {
    // return this.weaviateService.addUrlImages();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async getFile(@UploadedFile() file: Express.Multer.File) {
    const mediaString = await toBase64FromMedia(file.buffer);
    return this.weaviateService.findProduct(mediaString, 'ProductsCollection');
  }

  @Post('collection-name')
  createCollection(@Body() createCollectionDto: { collectionName: string }) {
    return this.weaviateService.createCollection(createCollectionDto);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const image = await toBase64FromMedia(file.buffer);
    return this.weaviateService.upload({
      image,
      productId: 'hsl234',
      collectionName: 'ProductsCollection',
      imageId: uuid(),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weaviateService.deleteObjectCommand({
      id,
      collectionName: 'ProductsCollection',
    });
  }
}
