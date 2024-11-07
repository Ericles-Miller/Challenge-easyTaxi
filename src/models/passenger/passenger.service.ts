import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Passenger } from './entities/passenger.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private readonly repository: Repository<Passenger>,
  ) {}

  async create({ name, phone }: CreatePassengerDto): Promise<Passenger> {
    try {
      const passengerExists = await this.repository.findOne({
        where: { phone },
      });
      if (passengerExists) throw new BadRequestException('The phone already exists to other passenger.');

      let passenger = new Passenger(name, phone);

      passenger = await this.repository.save(passenger);
      return passenger;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Unexpected server error to create a new passenger');
    }
  }

  async findAll(): Promise<Passenger[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Passenger> {
    const driver = await this.repository.findOne({
      where: { id },
    });

    if (!driver) throw new BadRequestException('Does not exists driver with id');

    return driver;
  }
}
