import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Repository } from 'typeorm';
import { Passenger } from '../passenger/entities/passenger.entity';
import { Driver } from '../driver/entities/driver.entity';
import { RideFullResponseDTO } from './dto/ride-full-response.dto';
import { MappingRide } from 'src/domain/Mappings/MappingRide';
import { RideShortResponseDTO } from './dto/ride-short-response.dto';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,

    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,

    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,

    private mapper: MappingRide,
  ) {}

  async create({ destination, origin, passengerId, value }: CreateRideDto): Promise<RideShortResponseDTO> {
    try {
      const passengerExists = await this.passengerRepository.findOne({
        where: { id: passengerId },
      });
      if (!passengerExists) throw new BadRequestException('Passenger id does not exists');

      let ride = new Ride(origin, destination, value, passengerId);

      ride = await this.rideRepository.save(ride);

      const response = this.mapper.mapperEntityToShortResponse(ride, passengerExists.name);

      return response;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Unexpected server error to create ride');
    }
  }

  findAll() {
    return `This action returns all ride`;
  }

  async findOne(id: string): Promise<RideFullResponseDTO> {
    try {
      const ride = await this.rideRepository.findOne({ where: { id }, relations: ['passenger', 'driver'] });
      if (!ride) throw new BadRequestException('id of ride is incorrect');

      return this.mapper.mapperEntityToFullResponse(ride);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Unexpected server error to list read');
    }
  }

  update(id: number, updateRideDto: UpdateRideDto) {
    return `This action updates a #${id} ride`;
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
}
