import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  // FirstName
  @ApiProperty({
    example: 'Doe',
    description: 'provide the fistname of the user',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  // Lastname
  @ApiProperty({
    example: 'Jane',
    description: 'provide the lastName of the user',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  // Email
  @ApiProperty({
    example: 'email@example.com',
    description: 'provide the unique Email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // Password
  @ApiProperty({
    example: 'aStrong9assword!',
    description: 'provide a strong password for user',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
