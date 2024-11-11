import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly repository: Repository<Driver>,

    //private readonly passenger: PassengerService,
  ) {}

  async create({ car, name, phone }: CreateDriverDto): Promise<Driver> {
    try {
      const driverExists = await this.repository.findOne({
        where: { phone },
      });

      if (driverExists) throw new BadRequestException('This phone already exists to other user.');

      //const phoneExists = await this.passenger.findPhone(phone);
      //if (phoneExists) throw new BadRequestException('This phone already exists to other user.');

      let driver = new Driver(name, phone, car);

      driver = await this.repository.save(driver);

      return driver;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Unexpected server error to create a new driver');
    }
  }

  async findAll(): Promise<Driver[]> {
    try {
      return await this.repository.find();
    } catch {
      throw new InternalServerErrorException('Internal server error to list all drivers');
    }
  }

  async findOne(id: string): Promise<Driver> {
    try {
      const driver = await this.repository.findOne({
        where: { id },
      });

      if (!driver) throw new NotFoundException('Does not exists driver with id');

      return driver;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Internal server error to list drivers by id');
    }
  }

  async findByPhone(phone: string): Promise<boolean> {
    const phoneExists = await this.repository.findOne({ where: { phone } });
    return phoneExists ? true : false;
  }
}
