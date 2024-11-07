import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Repository } from 'typeorm';
import { Passenger } from '../passenger/entities/passenger.entity';
import { Driver } from '../driver/entities/driver.entity';

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

  async create({ destination, origin, passengerId, value }: CreateRideDto): Promise<Ride> {
    try {
      const passengerExists = await this.passengerRepository.findOne({ where: { id: passengerId } });
      if (!passengerExists) throw new BadRequestException('Passenger id does not exists');

      let ride = new Ride(origin, destination, value, passengerId);

      ride = await this.rideRepository.save(ride);

      return ride;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Unexpected server error to create ride');
    }
  }

  findAll() {
    return `This action returns all ride`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ride`;
  }

  update(id: number, updateRideDto: UpdateRideDto) {
    return `This action updates a #${id} ride`;
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
}
