import { ApiProperty } from '@nestjs/swagger';

export class RideShortResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  origin: string;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  passenger: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  status: string;
}
