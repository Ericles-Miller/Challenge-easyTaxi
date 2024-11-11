import { Module } from '@nestjs/common';
import { PhoneValidatorService } from './phone-validator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/driver/entities/driver.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Passenger])],
  providers: [PhoneValidatorService],
  exports: [PhoneValidatorService],
})
export class PhoneValidatorModule {}
