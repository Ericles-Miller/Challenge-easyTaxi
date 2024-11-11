import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/driver/entities/driver.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhoneValidatorService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,

    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async validateUniquePhone(phone: string): Promise<void> {
    const passengerExists = await this.passengerRepository.findOne({ where: { phone } });
    if (passengerExists) throw new BadRequestException('Phone number already exists for a user');

    const driverExists = await this.driverRepository.findOne({ where: { phone } });
    if (driverExists) throw new BadRequestException('Phone number already exists for a user');
  }
}
