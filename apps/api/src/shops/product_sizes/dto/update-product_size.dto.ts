import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSizeDto } from './create-product_size.dto';

export class UpdateProductSizeDto extends PartialType(CreateProductSizeDto) {}
