import { Module } from '@nestjs/common';
import { ProductCommentsService } from './product-comments.service';
import { ProductCommentsController } from './product-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductComment } from './entities/product-comment.entity';
import { Product } from '../shops/products/entities/product.entity';
import { ProductsModule } from '../shops/products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductComment, Product]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [ProductCommentsController],
  providers: [ProductCommentsService],
})
export class ProductCommentsModule {}
