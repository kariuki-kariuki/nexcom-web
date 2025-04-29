import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProjectIdType } from 'src/@types/types';

export class CreateProductSizeDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  productId: ProjectIdType;
}
