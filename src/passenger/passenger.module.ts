import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { PhoneValidatorModule } from 'src/phone-validator/phone-validator.module';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger]), PhoneValidatorModule],
  controllers: [PassengerController],
  providers: [PassengerService],
  exports: [PassengerService],
})
export class PassengerModule {}
