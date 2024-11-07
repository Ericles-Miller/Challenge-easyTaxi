import { ApiProperty } from '@nestjs/swagger';
import { RideShortResponseDTO } from './ride-short-response.dto';

export class RideFullResponseDTO extends RideShortResponseDTO {
  @ApiProperty()
  driver?: string;

  @ApiProperty()
  startedAt?: string;

  @ApiProperty()
  finishedAt?: string;
}
