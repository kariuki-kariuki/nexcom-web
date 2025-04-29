import { Module } from '@nestjs/common';
import { ProductCommentsService } from './product-comments.service';
import { ProductCommentsController } from './product-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductComment } from './entities/product-comment.entity';
import { ProductsModule } from 'src/shops/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { Product } from 'src/shops/products/entities/product.entity';

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
