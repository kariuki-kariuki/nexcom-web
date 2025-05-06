import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  // email
  @ApiProperty({ description: 'email you registered with' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'your password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
