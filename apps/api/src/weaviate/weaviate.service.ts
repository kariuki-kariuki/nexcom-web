import weaviate, {
  CollectionConfigCreate,
  dataType,
  toBase64FromMedia,
} from 'weaviate-client';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import fetch from 'node-fetch';
import { Image } from 'src/shops/product_images/entities/image.entity';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class WeaviateService {
  constructor(private readonly awsService: AwsService) {}
  async getClient() {
    try {
      return await weaviate.connectToLocal({
        host: 'localhost',
        port: 8080,
        grpcPort: 50051,
      });
    } catch (e) {
      console.log('failed to connect: ', e);
    }
  }

  async findProduct(image: Base64URLString, collectionName: string) {
    const collection = await this.findCollection(collectionName);
    const response = await collection.query.nearImage(image, {
      limit: 2,
    });

    return response;
  }

  async findCollection(name: string) {
    try {
      const client = await this.getClient();
      const collection = client.collections.get(name);
      return collection;
    } catch (e) {
      console.log(e.message);
    }
  }

  async findCollectionName(name: string) {
    const items = [];
    try {
      const collection = await this.findCollection(name);
      for await (const item of collection.iterator()) {
        items.push(item);
      }
      // console.log('Collection: ', collection);
      return items;
    } catch (e) {
      console.log(e.message);
    }
  }

  async upload({
    image,
    collectionName,
    productId,
    imageId,
  }: {
    image: Base64URLString;
    collectionName: string;
    productId: string;
    imageId: string;
  }) {
    const dataObj = {
      image,
      title: `Image for product ${productId}`,
      productId,
    };
    const collection = await this.findCollection(collectionName);
    try {
      const res = await collection.data.insert({
        properties: dataObj,
        id: imageId,
      });
      return res;
    } catch (e) {
      console.error('Data insertion failed for image:', e);
    }
  }

  async deleteObjectCommand({
    id,
    collectionName,
  }: {
    id: string;
    collectionName: string;
  }) {
    const collection = await this.findCollection(collectionName);
    try {
      const res = await collection.data.deleteById(id);
      return res;
    } catch (e) {
      throw new UnprocessableEntityException(
        'Failed to delete the products',
        e,
      );
    }
  }

  async createCollection({ collectionName }: { collectionName: string }) {
    const client = await this.getClient();
    const schemaConfig: CollectionConfigCreate = {
      name: collectionName,
      vectorizers: weaviate.configure.vectorizer.img2VecNeural({
        imageFields: ['image'],
      }),
      properties: [
        {
          name: 'title',
          dataType: 'text',
        },
        {
          name: 'image',
          dataType: 'blob',
        },
        {
          name: 'productId',
          dataType: dataType.TEXT,
        },
      ],
    };

    // Throw an error if collection exists
    try {
      const exists = await client.collections.exists(collectionName);
      if (exists) {
        await client.collections.delete(collectionName);
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const res = await client.collections.create(schemaConfig);
      return JSON.stringify(res);
    } catch (e) {
      console.error('Schema creation failed:', e);
      throw new UnprocessableEntityException('Schema creation failed');
    }
  }

  async addUrlImages(images: Image[]) {
    try {
      for (const image of images) {
        const imageString = await this.getImageString(image.url);
        await this.upload({
          image: imageString,
          imageId: image.id,
          collectionName: 'ProductsCollection',
          productId: image.product.id,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getImageString(url: string) {
    try {
      const response = await fetch(url);
      const bufferArray = await response.arrayBuffer();
      const buffer = Buffer.from(bufferArray);
      return toBase64FromMedia(buffer);
    } catch (e) {
      console.log(e);
    }
  }
}
