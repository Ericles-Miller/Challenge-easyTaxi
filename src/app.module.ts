import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './infra/database/database.providers';
import { PassengerModule } from './models/passenger/passenger.module';
import { DriverModule } from './models/driver/driver.module';
import { RideModule } from './models/ride/ride.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    PassengerModule,
    DriverModule,
    RideModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
