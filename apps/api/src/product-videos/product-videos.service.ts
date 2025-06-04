import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { CreateProductVideoDto } from './dto/create-product-video.dto';
import { UpdateProductVideoDto } from './dto/update-product-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVideo } from './entities/product-video.entity';
import { Repository } from 'typeorm';
import { Payload } from '../@types/chat/chat';
import { ProductStatus } from '../@types/product-status';
import { AwsService } from '../aws/aws.service';
import { ProductsService } from '../shops/products/products.service';

interface INewProduct {
  createProductVideoDto: CreateProductVideoDto;
  file: Express.Multer.File;
  payload: Payload;
}

@Injectable()
export class ProductVideosService {
  private logger = new Logger(ProductVideosService.name);
  constructor(
    @InjectRepository(ProductVideo)
    private productVidsRepo: Repository<ProductVideo>,
    private productService: ProductsService,
    private awsService: AwsService,
  ) {}
  async create({ createProductVideoDto, file, payload }: INewProduct) {
    const { productId, description } = createProductVideoDto;
    const product = await this.productService.findOne(productId);

    if (product.shop.id !== payload.shopId) {
      throw new ForbiddenException('You are forbiden to perfom the action');
    }

    try {
      const url = await this.awsService.uploadFile(file, 'product/videos');
      const video = this.productVidsRepo.create({
        product,
        url,
        name: file.filename,
        description,
      });
      const savedVideo = await this.productVidsRepo.save(video);
      return savedVideo;
    } catch (e) {
      this.logger.error('Error Uploading video', e);
    }
  }

  async findAll() {
    const videos = await this.productVidsRepo.find({
      relations: {
        product: {
          shop: { user: true },
          images: true,
          comments: true,
        },
      },
      where: {
        product: {
          status: ProductStatus.PUBLISHED,
        },
      },
    });

    return videos;
  }

  async findOne(id: string) {
    const video = await this.productVidsRepo.findOne({
      where: { id, product: { status: ProductStatus.PUBLISHED } },
      relations: {
        product: {
          shop: { user: true },
          images: true,
          comments: { user: true },
        },
      },
    });

    return video;
  }

  update(id: string, updateProductVideoDto: UpdateProductVideoDto) {
    return updateProductVideoDto;
  }

  remove(id: string) {
    return `This action removes a #${id} productVideo`;
  }
}
