import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateRideDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'My home',
    description: 'origin of where the passenger is',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  origin: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Park Ibirapuera',
    description: 'destination where the passenger is going',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  destination: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @MinLength(0.1, { message: 'the run value must be greater than 0.0' })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'value of ride',
    example: '35,43',
  })
  value: number;

  @ApiProperty({
    type: String,
    required: true,
    description: `passenger's id`,
    example: 'd4c5593d-1c35-430c-bf64-ded0a548acbb',
  })
  @IsUUID()
  passengerId: string;

  @ApiProperty({
    type: String,
    required: true,
    description: `driver's id`,
    example: 'd4c5593d-1c35-430c-bf64-ded0a548acbb',
  })
  @IsUUID()
  @ApiProperty()
  driverId: string;
}
