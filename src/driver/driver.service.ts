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
import { PhoneValidatorService } from 'src/phone-validator/phone-validator.service';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly repository: Repository<Driver>,

    private readonly phoneValidator: PhoneValidatorService,
  ) {}

  async create({ car, name, phone }: CreateDriverDto): Promise<Driver> {
    try {
      await this.phoneValidator.validateUniquePhone(phone);

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
