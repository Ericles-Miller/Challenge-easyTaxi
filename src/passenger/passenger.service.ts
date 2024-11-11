import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Passenger } from './entities/passenger.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneValidatorService } from 'src/phone-validator/phone-validator.service';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private readonly repository: Repository<Passenger>,

    private readonly phoneValidator: PhoneValidatorService,
  ) {}

  async create({ name, phone }: CreatePassengerDto): Promise<Passenger> {
    try {
      await this.phoneValidator.validateUniquePhone(phone);

      let passenger = new Passenger(name, phone);

      passenger = await this.repository.save(passenger);
      return passenger;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Unexpected server error to create a new passenger');
    }
  }

  async findAll(): Promise<Passenger[]> {
    try {
      return await this.repository.find();
    } catch {
      throw new InternalServerErrorException('Internal server error to list all passengers');
    }
  }

  async findOne(id: string): Promise<Passenger> {
    try {
      const driver = await this.repository.findOne({
        where: { id },
      });

      if (!driver) throw new NotFoundException('Does not exists driver with id');

      return driver;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Internal server erro to list passenger by id');
    }
  }

  async findByPhone(phone: string): Promise<boolean> {
    const phoneExists = await this.repository.findOne({ where: { phone } });
    return phoneExists ? true : false;
  }
}
