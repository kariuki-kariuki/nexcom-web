import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { AwsService } from '../../aws/aws.service';
import { ProductsService } from '../products/products.service';
import { ProjectIdType } from 'src/@types/types';
import { WeaviateService } from 'src/weaviate/weaviate.service';
import { toBase64FromMedia } from 'weaviate-client';
import { COLLECTION_NAME } from 'src/lib/constants';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private awsService: AwsService,
    @Inject(forwardRef(() => ProductsService))
    private productService: ProductsService,
    private readonly weaviateService: WeaviateService,
  ) {}
  async create(
    createImageDto: CreateImageDto,
    files: Array<Express.Multer.File>,
  ) {
    const images = await Promise.all(
      files.map(async (file) => {
        const image = new Image();
        const product = await this.productService.findOne(
          createImageDto.productId,
        );
        const imageString = await toBase64FromMedia(file.buffer);
        image.url = await this.awsService.uploadFile(file, 'products');
        image.product = product;
        image.name = createImageDto.name ? createImageDto.name : file.filename;
        image.altText = createImageDto.altText
          ? createImageDto.altText
          : `Product ${product.id} image`;
        const savedImage = await this.imageRepository.save(image);
        try {
          await this.weaviateService.upload({
            image: imageString,
            productId: createImageDto.productId,
            collectionName: 'ProductsCollection',
            imageId: savedImage.id,
          });
          console.log('added product image successfully', savedImage.id);
        } catch (e) {
          console.log(e);
        }

        return savedImage;
      }),
    );

    return images;
  }

  async findAll() {
    let images = await this.imageRepository.find({
      relations: {
        product: true,
      },
    });
    images = await this.awsService.getMultipleUrls(images);

    return images;
  }

  async addAllToWeaviate() {
    const images = await this.findAll();
    return this.weaviateService.addUrlImages(images);
  }

  async findOne(id: ProjectIdType) {
    const images = await this.imageRepository.find({
      where: { id },
      relations: {
        product: true,
      },
    });
    const image = images[0];
    image.url = await this.awsService.getSignedURL(image.url);
    return image;
  }

  async update(id: ProjectIdType, updateImageDto: UpdateImageDto) {
    const image = await this.findOne(id);
    image.altText = updateImageDto.altText ?? image.altText;
    return this.imageRepository.save(image);
  }

  async findAllProductImg(productId: ProjectIdType): Promise<Image[]> {
    const images = await this.imageRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
      relations: ['product'], // Specify relations to load related product data
    });

    return images;
  }

  async removeAll(id: ProjectIdType) {
    const image = await this.findOne(id);
    try {
      const res = await this.awsService.deleteImage(image.url);
      console.log('Deleted image', res);
      return this.imageRepository.remove(image);
    } catch (e) {
      throw new UnprocessableEntityException('Failed to delete Image');
    }
  }

  async remove(id: ProjectIdType) {
    const image = await this.findOne(id);
    const allImages = await this.findAllProductImg(image.product.id);
    if (allImages.length <= 1) {
      throw new UnprocessableEntityException('Images Cannot Be Zero');
    }
    try {
      await this.awsService.deleteImage(image.url);
      this.weaviateService.deleteObjectCommand({
        id: image.id,
        collectionName: COLLECTION_NAME,
      });
      return this.imageRepository.remove(image);
    } catch (e) {
      throw new UnprocessableEntityException('Failed to delete Image');
    }
  }
}
