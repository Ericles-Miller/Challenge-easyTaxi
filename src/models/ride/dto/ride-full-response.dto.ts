import { ApiProperty, OmitType } from '@nestjs/swagger';
import { RideShortResponseDTO } from './ride-short-response.dto';
import { Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';

export class RideFullResponseDTO extends OmitType(RideShortResponseDTO, [
  'driver',
  'startedAt',
  'finishedAt',
]) {
  @Expose()
  @ApiProperty()
  @Transform(({ obj }) => obj.driver?.name || null)
  driver?: string;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => format(value, 'dd/MM/yyyy'))
  startedAt?: string;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => format(value, 'dd/MM/yyyy'))
  finishedAt?: string;
}
