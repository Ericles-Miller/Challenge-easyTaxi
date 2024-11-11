import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { DriverModule } from 'src/driver/driver.module';
import { PassengerModule } from 'src/passenger/passenger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ride]), DriverModule, PassengerModule],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
