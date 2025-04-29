import { Module } from '@nestjs/common';
import { WeaviateService } from './weaviate.service';
import { WeaviateController } from './weaviate.controller';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [WeaviateController],
  providers: [WeaviateService],
  exports: [WeaviateService],
})
export class WeaviateModule {}
