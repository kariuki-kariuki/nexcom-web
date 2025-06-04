import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ProjectIdType } from '../../../@types/types';

export class CreateProductSizeDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: ProjectIdType;
}
