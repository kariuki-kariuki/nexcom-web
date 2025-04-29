import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SearchUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  text: string;
}
