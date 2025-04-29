import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidV4 } from 'uuid';

import { Image } from '../shops/product_images/entities/image.entity';
import { BlogImage } from '../blog-images/entities/blog-image.entity';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
@Injectable()
export class AwsService {
  private awsRegion = this.configService.getOrThrow('AWS_S3_REGION');
  private bucket = this.configService.getOrThrow('AWS_BUCKET_NAME');
  private readonly s3Client = new S3Client({
    region: this.awsRegion,
  });

  constructor(private readonly configService: ConfigService) {}
  async uploadFile(file: Express.Multer.File, prefix: string) {
    const key = `${prefix}/${uuidV4()}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    try {
      await this.s3Client.send(command);
      return key;
    } catch (err) {
      throw new UnprocessableEntityException('Failed to upload images');
    }
  }
  async getSignedURL(key: string) {
    try {
      if (!key) {
        return null;
      }
      const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
      const res = await getSignedUrl(this.s3Client, command, {
        expiresIn: 604800,
      });
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  async getMultipleUrls(images: Image[] | BlogImage[]) {
    const signedImages = await Promise.all(
      images.map(async (image) => {
        try {
          const signedUrl = await this.getSignedURL(image.url); // Use image.url as the key
          return { ...image, url: signedUrl }; // Spread existing image properties and update url
        } catch (err) {
          console.error(
            'Error generating signed URL for image:',
            image.name || image.id,
            err,
          );
          // Optionally handle errors here for individual images (e.g., return a default URL)
          return image; // Return original image without a signed URL
        }
      }),
    );

    return signedImages;
  }

  async deleteImage(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    try {
      await this.s3Client.send(command);
    } catch (err) {
      throw new UnprocessableEntityException('Failed to delete image');
    }
    return `Successfully deleted image with key: ${key}`;
  }

  async getImageKeysByUser() {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
    });

    const { Contents = [] } = await this.s3Client.send(command);
    const res = Promise.all(
      Contents.map(async (image) => ({
        image: image.Key,
        url: await this.getSignedURL(image.Key),
      })),
    );
    return res;
  }
}
