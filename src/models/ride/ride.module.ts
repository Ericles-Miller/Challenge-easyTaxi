import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from '../passenger/entities/passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ride, Driver, Passenger])],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
