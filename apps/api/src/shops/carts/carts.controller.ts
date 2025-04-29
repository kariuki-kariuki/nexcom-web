import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/@types/types';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createCartDto: CreateCartDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.cartsService.create({ createCartDto, userId: req.user.userId });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: AuthenticatedRequest) {
    return this.cartsService.findAll({ userId: req.user.userId });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.cartsService.update({
      id,
      updateCartDto,
      userId: req.user.userId,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
