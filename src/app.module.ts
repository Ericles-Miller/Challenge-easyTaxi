import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './infra/database/database.providers';
import { PassengerModule } from './models/passenger/passenger.module';
import { DriverModule } from './models/driver/driver.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    PassengerModule,
    DriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
