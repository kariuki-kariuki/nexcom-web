import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ProjectIdType } from 'src/@types/types';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  cartIds: ProjectIdType[];

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phone: string;
}
