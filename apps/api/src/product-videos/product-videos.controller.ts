import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Request,
  UploadedFile,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { ProductVideosService } from './product-videos.service';
import { UpdateProductVideoDto } from './dto/update-product-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../utils/roles.decorator';
import { UserRoles, AuthenticatedRequest } from '../@types/types';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('product-videos')
export class ProductVideosController {
  constructor(private readonly productVideosService: ProductVideosService) {}

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body() createProductVideoDto: any,
    @Request() req: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'video/mp4' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productVideosService.create({
      createProductVideoDto,
      payload: req.user,
      file,
    });
  }

  @Get()
  findAll() {
    return this.productVideosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVideosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductVideoDto: UpdateProductVideoDto,
  ) {
    return this.productVideosService.update(id, updateProductVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVideosService.remove(id);
  }
}
