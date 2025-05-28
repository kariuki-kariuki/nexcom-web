import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
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
  @IsUUID()
  productId: ProjectIdType;
}
