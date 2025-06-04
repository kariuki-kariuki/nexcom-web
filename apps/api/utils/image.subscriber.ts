import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  RemoveEvent,
  InsertEvent,
} from 'typeorm';
import { Image } from '../src/shops/product_images/entities/image.entity';
import { AwsService } from '../src/aws/aws.service';
import { ProductVideo } from '../src/product-videos/entities/product-video.entity';

@EventSubscriber()
export class ImageSubscriber
  implements EntitySubscriberInterface<Image | ProductVideo>
{
  configService = new ConfigService();
  awsService = new AwsService(this.configService);
  logger = new Logger(ImageSubscriber.name);

  async afterLoad(entity: Image | ProductVideo) {
    await this.addSignedUrl(entity);
  }

  async afterInsert(event: InsertEvent<Image | ProductVideo>) {
    // Fixed typo here (afterInset -> afterInsert)
    if (event.entity) {
      await this.addSignedUrl(event.entity);
    }
  }

  async afterUpdate(event: UpdateEvent<Image | ProductVideo>) {
    if (event.entity) {
      await this.addSignedUrl(event.entity as Image | ProductVideo);
    }
  }

  async afterRemove(event: RemoveEvent<Image | ProductVideo>) {
    if (event.entity) {
      // Added check for entity existence
      await this.deleteImage(event.entity);
    }
  }

  private async deleteImage(image: Image | ProductVideo): Promise<void> {
    try {
      if (image?.url) {
        await this.awsService.deleteImage(image.url);
      }
    } catch (error) {
      this.logger.error('Error deleting image from storage', error);
    }
  }

  private async addSignedUrl(image: Image | ProductVideo): Promise<void> {
    if (image?.url) {
      try {
        image.signedUrl = (await this.awsService.getSignedURL(image.url)) || '';
      } catch (error) {
        this.logger.error('Error generating signed URL:', error);
        image.signedUrl = '';
      }
    }
  }
}
