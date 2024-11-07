import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Celta',
    description: 'name car',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(35, { message: 'Name must not exceed 100 characters' })
  car: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'John Doe',
    description: 'passenger name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  @Matches(/^[A-Za-zÀ-ÿ\s]+$/, {
    message: 'The name contains invalids characters',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '+55 (19) 991928543',
    description: 'phone passenger',
  })
  @Matches(/^[\+\-\(\)\d\s]+$/, {
    message:
      'Phone number can only contain numbers, spaces, and the following characters: +, (, ), -',
  })
  @Transform(({ value }) => value?.replace(/\D/g, ''), { toClassOnly: true })
  @MinLength(13, {
    message:
      'The phone number be at least 13 characters long or contains invalids characters.',
  })
  @MaxLength(20, {
    message:
      'the phone number not exceed 20 characters or contains invalids characters.',
  })
  phone: string;
}
