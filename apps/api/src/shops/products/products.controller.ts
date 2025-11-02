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
  Req,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  UserRoles,
  AuthenticatedRequest,
  ProjectIdType,
  AnalyticsRequest,
} from '../../@types/types';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles/roles.guard';
import { Roles } from '../../../utils/roles.decorator';
import { ProductQueryDto } from './dto/product-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createProductDto: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.productsService.create(
      createProductDto,
      files,
      req.user.shop?.id,
    );
  }

  @Post('image-search')
  @UseInterceptors(FileInterceptor('file'))
  async findByImage(@UploadedFile() file: Express.Multer.File) {
    return this.productsService.findByImage(file);
  }

  @Get()
  findAll(@Query() dto: ProductQueryDto) {
    return this.productsService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: ProjectIdType, @Req() req: AnalyticsRequest) {
    return this.productsService.findOne(id, req.useragent);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('edit/:id')
  productToEdit(@Param('id') id: ProjectIdType) {
    return this.productsService.findPlain(id);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.productsService.update(id, updateProductDto, req.user.shop.id);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.productsService.remove(id, req.user.shop?.id);
  }
}
