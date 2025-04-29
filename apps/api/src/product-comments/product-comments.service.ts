import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductComment } from './entities/product-comment.entity';
import { Repository, TreeRepository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Product } from 'src/shops/products/entities/product.entity';

@Injectable()
export class ProductCommentsService {
  private logger = new Logger(ProductCommentsService.name);
  constructor(
    @InjectRepository(ProductComment)
    private readonly commentRepository: TreeRepository<ProductComment>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userService: UsersService,
  ) {}
  async create(
    createProductCommentDto: CreateProductCommentDto,
    userId: string,
  ) {
    const { content, productId, parentId } = createProductCommentDto;
    const product = await this.productRepository.findOneByOrFail({
      id: productId,
    });
    const user = await this.userService.findById(userId);
    const comment = this.commentRepository.create({ content, product, user });
    if (parentId) {
      const parent = await this.commentRepository.findOne({
        where: { id: parentId },
      });
      if (!parent) {
        throw new Error('Parent comment not found');
      }
      comment.parent = parent;
    }
    try {
      return await this.commentRepository.save(comment);
    } catch (e) {
      this.logger.error('Error saving message', e);
      throw new UnprocessableEntityException('An error occured');
    }
  }

  findAll() {
    return `This action returns all productComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productComment`;
  }

  update(id: number, updateProductCommentDto: UpdateProductCommentDto) {
    return `This action updates a #${id} productComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} productComment`;
  }
}
