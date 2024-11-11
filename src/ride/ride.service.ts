import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Repository } from 'typeorm';
import { RideFullResponseDTO } from './dto/ride-full-response.dto';
import { RideShortResponseDTO } from './dto/ride-short-response.dto';
import { plainToInstance } from 'class-transformer';
import { EStatusRide } from 'src/ride/enums/status-rides.enum';
import { PassengerService } from 'src/passenger/passenger.service';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,

    private readonly driver: DriverService,

    private readonly passenger: PassengerService,
  ) {}

  async create({ destination, origin, passengerId, value }: CreateRideDto): Promise<RideShortResponseDTO> {
    try {
      const passengerExists = await this.passenger.findOne(passengerId);
      if (!passengerExists) throw new NotFoundException('Passenger id does not exists.');

      let ride = new Ride(origin, destination, value, passengerId);
      ride.passenger = passengerExists;
      ride = await this.rideRepository.save(ride);

      const response = plainToInstance(RideShortResponseDTO, ride, {
        excludeExtraneousValues: true,
      });

      return response;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Unexpected server error to create ride.');
    }
  }

  async findOne(id: string): Promise<RideFullResponseDTO> {
    try {
      const ride = await this.rideRepository.findOne({ where: { id }, relations: ['passenger', 'driver'] });
      if (!ride) throw new NotFoundException('Does not exists ride with id.');

      return plainToInstance(RideFullResponseDTO, ride, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Unexpected server error to list ride');
    }
  }

  async update(id: string, { driverId, status }: UpdateRideDto): Promise<void> {
    try {
      const ride = await this.rideRepository.findOne({
        where: { id },
        relations: ['passenger', 'driver'],
      });

      if (!ride) throw new NotFoundException('Does not exists ride with id.');

      if (ride.driver) {
        if (ride.driver.id !== driverId) throw new BadRequestException('This ride already has a driver.');
      }

      if (ride.status === EStatusRide.FINISHED)
        throw new BadRequestException('It is not possible to change the status of a completed ride.');

      const driver = await this.driver.findOne(driverId);
      if (!driver) throw new NotFoundException('Does not exists driver with id');

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
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Unexpected server error to update ride');
    }
  }
}
