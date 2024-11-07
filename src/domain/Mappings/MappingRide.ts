import { format } from 'date-fns';
import { RideFullResponseDTO } from 'src/models/ride/dto/ride-full-response.dto';
import { RideShortResponseDTO } from 'src/models/ride/dto/ride-short-response.dto';
import { Ride } from 'src/models/ride/entities/ride.entity';

export class MappingRide {
  mapperEntityToShortResponse(ride: Ride, name: string): RideShortResponseDTO {
    const mapperResponse: RideShortResponseDTO = {
      id: ride.id,
      createdAt: format(ride.createdAt, 'dd/MM/yyyy'),
      passenger: name,
      destination: ride.destination,
      origin: ride.origin,
      status: ride.status,
      value: ride.value,
    };

    return mapperResponse;
  }

  mapperEntityToFullResponse(ride: Ride): RideFullResponseDTO {
    const mapperResponse: RideFullResponseDTO = {
      id: ride.id,
      createdAt: format(ride.createdAt, 'dd/MM/yyyy'),
      destination: ride.destination,
      driver: ride.driver ? ride.driver.name : null,
      finishedAt: ride.finishedAt ? format(ride.finishedAt, 'dd/MM/yyyy') : null,
      startedAt: ride.finishedAt ? format(ride.startedAt, 'dd/MM/yyyy') : null,
      origin: ride.origin,
      passenger: ride.passenger.name,
      status: ride.status,
      value: ride.value,
    };

    return mapperResponse;
  }
}
