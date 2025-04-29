import { Module } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { GalleriesController } from './galleries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery]), AwsModule],
  controllers: [GalleriesController],
  providers: [GalleriesService],
  exports: [GalleriesService],
})
export class GalleriesModule {}
