import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateImageDto {
  @IsNumberString()
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
