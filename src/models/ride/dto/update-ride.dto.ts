import { EStatusRide } from 'src/domain/enums/status-rides.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IsEnumValidToRequest } from 'src/domain/validations/enum-validator';

export class UpdateRideDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'driver id',
    example: 'd4c5593d-1c35-430c-bf64-ded0a548acbb',
  })
  @IsNotEmpty()
  @IsUUID()
  driverId: string;

  @ApiProperty({
    enum: [EStatusRide.IN_PROGRESS, EStatusRide.FINISHED],
    required: true,
    description: 'status ride',
  })
  @IsEnumValidToRequest()
  status: EStatusRide;
}
