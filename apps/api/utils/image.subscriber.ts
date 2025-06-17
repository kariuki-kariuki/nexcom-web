import { Injectable, Logger } from '@nestjs/common';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  RemoveEvent,
  InsertEvent,
  DataSource,
} from 'typeorm';
import { Image } from '../src/shops/product_images/entities/image.entity';
import { AwsService } from '../src/aws/aws.service';
import { RedisService } from '../src/redis/redis.service';

@EventSubscriber()
@Injectable()
export class ImageSubscriber implements EntitySubscriberInterface<Image> {
  constructor(
    dataSource: DataSource,
    private readonly redisService: RedisService,
    private readonly awsService: AwsService,
  ) {
    dataSource.subscribers.push(this);
  }
  logger = new Logger(ImageSubscriber.name);

  async afterLoad(entity: Image) {
    await this.addSignedUrl(entity);
  }

  async afterInsert(event: InsertEvent<Image>) {
    // Fixed typo here (afterInset -> afterInsert)
    if (event.entity) {
      await this.addSignedUrl(event.entity);
    }
  }

  async afterUpdate(event: UpdateEvent<Image>) {
    if (event.entity) {
      await this.updateSignedUrl(event.entity as Image);
    }
  }

  async afterRemove(event: RemoveEvent<Image>) {
    if (event.entity) {
      // Added check for entity existence
      await this.deleteImage(event.entity);
    }
  }

  private async deleteImage(image: Image): Promise<void> {
    try {
      if (image?.url) {
        await this.awsService.deleteImage(image.url);
        await this.redisService.deleteSignedUrl(image.url);
      }
    } catch (error) {
      this.logger.error('Error deleting image from storage', error);
    }
  }

  private async updateSignedUrl(image: Image): Promise<void> {
    if (image?.url) {
      try {
        const signedUrl = await this.awsService.getSignedURL(image.url);
        await this.redisService.setSignedUrl(image.url, signedUrl, 604800);
        image.signedUrl = signedUrl;
      } catch (error) {
        this.logger.error('Error generating signed URL:', error);
        image.signedUrl = '';
      }
    }
  }

  private async addSignedUrl(image: Image): Promise<void> {
    if (image?.url) {
      try {
        const savedUrl = (await this.redisService.getSignedUrl(
          image.url,
        )) as string;
        if (savedUrl) {
          image.signedUrl = savedUrl;
          return;
        }

        const signedUrl = await this.awsService.getSignedURL(image.url);
        await this.redisService.setSignedUrl(image.url, signedUrl, 604800);
        image.signedUrl = signedUrl;
      } catch (error) {
        this.logger.error('Error generating signed URL:', error);
        image.signedUrl = '';
      }
    }
  }
}
