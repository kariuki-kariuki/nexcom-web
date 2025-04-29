import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
