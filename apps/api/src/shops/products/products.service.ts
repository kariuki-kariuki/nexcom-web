import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ImagesService } from '../product_images/images.service';
import { ProductStatus } from 'src/@types/product-status';
import { BrowserInfo, ProjectIdType } from 'src/@types/types';
import { WeaviateService } from 'src/weaviate/weaviate.service';
import { toBase64FromMedia } from 'weaviate-client';
import { Analytic } from 'src/analytics/entity/analytic.entity';
import { Shop } from '../entities/shop.entity';
import { Category } from '../categories/entities/category.entity';
import { ProductSize } from '../product_sizes/entities/product_size.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRespository: Repository<Product>,
    private imagesService: ImagesService,
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
    private weaviateService: WeaviateService,
    @InjectRepository(Analytic)
    private analyticRepository: Repository<Analytic>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(ProductSize)
    private readonly productSizeRepo: Repository<Category>,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
    shopId: string,
  ): Promise<Product> {
    const product = new Product();
    const shop = await this.shopRepository.findOneByOrFail({ id: shopId });

    const {
      category: categ,
      name,
      description,
      status,
      stock,
      sizes,
    } = createProductDto;
    const category = await this.categoriesRepository.findOneBy({
      id: categ.id,
    });

    const prdSizes: ProductSize[] = JSON.parse(sizes);
    if (prdSizes.length < 1) {
      throw new UnprocessableEntityException('Selecct Sizes Please');
    }
    prdSizes.map((size) => this.productSizeRepo.create(size));
    if (!category) {
      throw new UnprocessableEntityException('Select Category');
    }
    product.shop = shop;
    product.name = name;
    product.description = description;
    product.category = category;
    product.product_sizes = prdSizes;
    product.stock = parseInt(stock, 10);
    product.status = status;
    const newproduct = await this.productRespository.save(product);
    newproduct.images = await this.imagesService.create(
      { productId: product.id.toString() },
      files,
    );

    return newproduct;
  }

  async findAll() {
    const products = await this.productRespository.find({
      relations: {
        shop: {
          user: true,
        },
      },
      where: {
        status: ProductStatus.PUBLISHED,
      },
    });
    return products;
  }

  async findByImage(file: Express.Multer.File) {
    const imageString = await toBase64FromMedia(file.buffer);
    const res = await this.weaviateService.findProduct(
      imageString,
      'ProductsCollection',
    );
    if (res) {
      const images = Promise.all(
        res.objects.map(
          async (obj) => await this.imagesService.findOne(obj.uuid),
        ),
      );
      return images;
    }
    throw new UnprocessableEntityException('Failed to retriev images');
  }

  async findPlain(id: ProjectIdType) {
    const product = await this.productRespository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
        product_sizes: true,
        category: true,
        shop: { user: true },
        comments: true,
      },
    });
    return product;
  }

  async findOne(id: ProjectIdType, userAgent?: BrowserInfo) {
    const product = await this.productRespository.findOne({
      where: {
        id,
        status: ProductStatus.PUBLISHED,
      },
      relations: {
        images: true,
        product_sizes: true,
        category: true,
        shop: { user: true },
        comments: true,
      },
    });
    if (!product) {
      throw new ForbiddenException('Product Not Found');
    }
    if (userAgent) {
      const analytic = this.analyticRepository.create(userAgent);
      analytic.product = product;
      await this.analyticRepository.save(analytic);
    }

    return product;
  }

  async update(
    id: ProjectIdType,
    updateProductDto: UpdateProductDto,
    shopId: string,
  ) {
    const product = await this.productWithPersmisions(id, shopId);

    const {
      name = product.name,
      description = product.description,
      status = product.status,
      stock = product.stock,
      category = product.category,
    } = updateProductDto;
    const imageLength = product.images.length;

    product.name = name;
    product.description = description;
    product.status =
      imageLength < 1 && status === ProductStatus.PUBLISHED
        ? ProductStatus.DRAFT
        : status;
    product.stock = typeof stock === 'string' ? parseInt(stock, 10) : stock;
    product.category = category;
    const res = await this.productRespository.save(product);
    return res;
  }

  async productWithPersmisions(
    productId: string,
    shopId: string,
  ): Promise<Product> {
    const product = await this.productRespository.findOne({
      where: {
        id: productId,
        shop: {
          id: shopId,
        },
      },
      relations: {
        images: true,
        analytics: true,
      },
    });
    if (!product) {
      throw new ForbiddenException('Action not allowed');
    }
    return product;
  }

  async remove(id: ProjectIdType, shopId: string) {
    const product = await this.productWithPersmisions(id, shopId);

    if (product.shop.id !== shopId) {
      throw new ForbiddenException('Unauthoized action');
    }
    try {
      product.images.forEach(
        async (image) => await this.imagesService.removeAll(image.id),
      );
      product.analytics.forEach(
        async (analytic) => await this.analyticRepository.delete(analytic.id),
      );
      return this.productRespository.delete(id);
    } catch (e) {
      throw new ForbiddenException('Cannot perfom Action');
    }
  }
}
