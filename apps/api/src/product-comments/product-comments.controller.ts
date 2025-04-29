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
import { ProductCommentsService } from './product-comments.service';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/@types/types';

@Controller('product-comments')
export class ProductCommentsController {
  constructor(
    private readonly productCommentsService: ProductCommentsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createProductCommentDto: CreateProductCommentDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.productCommentsService.create(
      createProductCommentDto,
      req.user.userId,
    );
  }

  @Get()
  findAll() {
    return this.productCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCommentDto: UpdateProductCommentDto,
  ) {
    return this.productCommentsService.update(+id, updateProductCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCommentsService.remove(+id);
  }
}
