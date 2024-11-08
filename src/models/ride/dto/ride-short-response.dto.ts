import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Ride } from '../entities/ride.entity';
import { Expose, Transform } from 'class-transformer';
import { EStatusRide } from 'src/domain/enums/status-rides.enum';
import { format } from 'date-fns';

export class RideShortResponseDTO extends OmitType(Ride, ['createdAt', 'passenger', 'status']) {
  @ApiProperty()
  @Expose()
  id: string;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => (value ? format(value, 'dd/MM/yyyy - HH:mm') : null))
  createdAt: string;

  @Expose()
  @ApiProperty()
  origin: string;

  @Expose()
  @ApiProperty()
  destination: string;

  @Expose()
  @ApiProperty()
  @Transform(({ obj }) => obj.passenger?.name)
  passenger: string;

  @Expose()
  @ApiProperty()
  value: number;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => EStatusRide[value])
  status: string;
}
