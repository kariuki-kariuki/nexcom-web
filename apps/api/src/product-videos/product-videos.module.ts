import { Module } from '@nestjs/common';
import { ProductVideosService } from './product-videos.service';
import { ProductVideosController } from './product-videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVideo } from './entities/product-video.entity';
import { ProductsModule } from 'src/shops/products/products.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    AwsModule,
    TypeOrmModule.forFeature([ProductVideo]),
    ProductsModule,
  ],
  controllers: [ProductVideosController],
  providers: [ProductVideosService],
})
export class ProductVideosModule {}
