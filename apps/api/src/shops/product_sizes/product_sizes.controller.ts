import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductSizesService } from './product_sizes.service';
import { CreateProductSizeDto } from './dto/create-product_size.dto';
import { UpdateProductSizeDto } from './dto/update-product_size.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'utils/roles.decorator';
import { UserRoles } from 'src/@types/types';

@Controller('product-sizes')
export class ProductSizesController {
  constructor(private readonly productSizesService: ProductSizesService) {}

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductSizeDto: CreateProductSizeDto) {
    return this.productSizesService.create(createProductSizeDto);
  }

  @Get()
  findAll() {
    return this.productSizesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSizesService.findOne(id);
  }
  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductSizeDto: UpdateProductSizeDto,
  ) {
    return this.productSizesService.update(id, updateProductSizeDto);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSizesService.remove(+id);
  }
}
