import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductStatus } from '../../../@types/product-status';
import { Category } from 'src/shops/categories/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  stock: string;

  @IsNotEmpty()
  @IsString()
  sizes: string;

  @IsNotEmpty()
  category: Category;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
