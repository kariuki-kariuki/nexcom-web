import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  // email
  @ApiProperty({ description: 'email you registered with' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'your password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
