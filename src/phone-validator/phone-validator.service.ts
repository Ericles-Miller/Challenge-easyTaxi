import { ConflictException, Injectable } from '@nestjs/common';
import { DriverService } from 'src/driver/driver.service';
import { PassengerService } from 'src/passenger/passenger.service';

@Injectable()
export class PhoneValidatorService {
  constructor(
    private readonly passengerService: PassengerService,
    private readonly driverService: DriverService,
  ) {}

  async validateUniquePhone(phone: string): Promise<void> {
    const passengerExists = await this.passengerService.findByPhone(phone);
    if (passengerExists) {
      throw new ConflictException('Phone number already exists for a user');
    }

    const driverExists = await this.driverService.findByPhone(phone);
    if (driverExists) {
      throw new ConflictException('Phone number already exists for a user');
    }
  }
}
