import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    const res = JSON.parse(value);
    console.log('Parsed Response', res);
    return res;
  })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  content: string;
}
