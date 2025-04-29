import { Module } from '@nestjs/common';
import { TendersService } from './tenders.service';
import { TendersController } from './tenders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tender } from './entities/tender.entity';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tender]), AwsModule],
  controllers: [TendersController],
  providers: [TendersService],
})
export class TendersModule {}
