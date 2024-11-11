import { Module } from '@nestjs/common';
import { PhoneValidatorService } from './phone-validator.service';
import { DriverModule } from 'src/driver/driver.module';
import { PassengerModule } from 'src/passenger/passenger.module';

@Module({
  imports: [DriverModule, PassengerModule],
  providers: [PhoneValidatorService],
})
export class PhoneValidatorModule {}
