import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './infra/database/database.providers';
import { PassengerModule } from './models/passenger/passenger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    PassengerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
