import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Repository } from 'typeorm';
import { Passenger } from '../passenger/entities/passenger.entity';
import { Driver } from '../driver/entities/driver.entity';
import { RideFullResponseDTO } from './dto/ride-full-response.dto';
import { RideShortResponseDTO } from './dto/ride-short-response.dto';
import { plainToInstance } from 'class-transformer';
import { EStatusRide } from 'src/domain/enums/status-rides.enum';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,

    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,

    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async create({ destination, origin, passengerId, value }: CreateRideDto): Promise<RideShortResponseDTO> {
    try {
      const passengerExists = await this.passengerRepository.findOne({
        where: { id: passengerId },
      });
      if (!passengerExists) throw new BadRequestException('Passenger id does not exists');

      let ride = new Ride(origin, destination, value, passengerId);

      ride = await this.rideRepository.save(ride);

      const response = plainToInstance(RideShortResponseDTO, ride, {
        excludeExtraneousValues: true,
      });

      return response;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Unexpected server error to create ride');
    }
  }

  async findOne(id: string): Promise<RideFullResponseDTO> {
    try {
      const ride = await this.rideRepository.findOne({ where: { id }, relations: ['passenger', 'driver'] });
      if (!ride) throw new BadRequestException('id of ride is incorrect');

      return plainToInstance(RideFullResponseDTO, ride, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Unexpected server error to list ride');
    }
  }

  async update(id: string, { driverId, status }: UpdateRideDto): Promise<void> {
    try {
      const ride = await this.rideRepository.findOne({
        where: { id },
        relations: ['passenger', 'driver'],
      });

      if (!ride) throw new BadRequestException('Does not exists ride with id');

      if (ride.driver) {
        if (ride.driver.id !== driverId) throw new BadRequestException('This ride already has a driver');
      }

      if (ride.status === EStatusRide.FINISHED)
        throw new BadRequestException('It is not possible to change the status of a completed ride');

      const driver = await this.driverRepository.findOne({ where: { id: driverId } });
      if (!driver) throw new BadRequestException('Does not exists driver with id');

      if (status === EStatusRide.IN_PROGRESS && ride.status === EStatusRide.WAIT) {
        ride.setStatusRide(status);
        ride.setStartedAt();
        ride.setDriverId(driverId);
      } else if (status === EStatusRide.FINISHED && ride.status === EStatusRide.IN_PROGRESS) {
        ride.setStatusRide(status);
        ride.setFinishedAt();
      } else {
        throw new BadRequestException('It is not possible to change the race status from await to finished');
      }

      await this.rideRepository.update(id, ride);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Unexpected server error to update ride');
    }
  }
}
