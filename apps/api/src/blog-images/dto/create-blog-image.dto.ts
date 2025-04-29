import {
  IsNumberString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogImageDto {
  @IsNumberString()
  @IsNotEmpty()
  blogId: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
