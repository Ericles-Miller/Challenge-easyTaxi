import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './database/database.providers';
import { PassengerModule } from './passenger/passenger.module';
import { DriverModule } from './driver/driver.module';
import { RideModule } from './ride/ride.module';
import { PhoneValidatorModule } from './phone-validator/phone-validator.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    PassengerModule,
    DriverModule,
    RideModule,
    PhoneValidatorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
