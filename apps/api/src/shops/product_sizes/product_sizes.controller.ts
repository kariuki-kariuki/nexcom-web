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
  Request,
} from '@nestjs/common';
import { ProductSizesService } from './product_sizes.service';
import { CreateProductSizeDto } from './dto/create-product_size.dto';
import { UpdateProductSizeDto } from './dto/update-product_size.dto';
import { UserRoles, AuthenticatedRequest } from '../../@types/types';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles/roles.guard';
import { Roles } from '../../../utils/roles.decorator';

@Controller('product-sizes')
export class ProductSizesController {
  constructor(private readonly productSizesService: ProductSizesService) {}

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createProductSizeDto: CreateProductSizeDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.productSizesService.create(
      createProductSizeDto,
      request.user.id,
    );
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
    @Req() request: AuthenticatedRequest,
  ) {
    return this.productSizesService.update(
      id,
      updateProductSizeDto,
      request.user.shop?.id,
    );
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.productSizesService.remove(id, req.user.shop?.id);
  }
}
