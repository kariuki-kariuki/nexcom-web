import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  Request,
  Query,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Roles } from 'utils/roles.decorator';
import { UserRoles, AuthenticatedRequest } from '../@types/types';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // create(@Body() createShopDto: CreateShopDto, @Request() req) {
  //   return this.shopsService.create(createShopDto, req.user.email, req.userId);
  // }

  @Get()
  findAll(@Query('name') name: string) {
    return this.shopsService.findOneByName(name);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('myshop')
  getMyShop(@Req() req: AuthenticatedRequest) {
    return this.shopsService.findMyShop(req.user.shopId);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('orders')
  getOrders(@Req() req: AuthenticatedRequest) {
    return this.shopsService.getOrders(req.user.shopId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsService.findShopWithProducts(id);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.shopsService.update(id, updateShopDto, req.user.userId);
  }

  @Roles(UserRoles.SHOP_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.remove(id);
  }
}
