import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'My Shop',
    description: 'The name of the shop',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'The category id of the shop product type',
  })
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'My Shop Description',
    description: 'The description of the shop',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the shop',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'My Shop Address',
    description: 'The address of the shop',
  })
  address: string;
}
