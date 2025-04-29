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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  AuthenticatedRequest,
  ProjectIdType,
  UserRoles,
} from 'src/@types/types';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'utils/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

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
      req.user.shopId,
    );
  }

  @Post('image-search')
  @UseInterceptors(FileInterceptor('file'))
  async findByImage(@UploadedFile() file: Express.Multer.File) {
    return this.productsService.findByImage(file);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ProjectIdType) {
    return this.productsService.findOne(id);
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
    return this.productsService.update(id, updateProductDto, req.user.shopId);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.productsService.remove(id, req.user.shopId);
  }
}
