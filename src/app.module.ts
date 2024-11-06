import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './infra/database/database.providers';
import { PassengerModule } from './models/passenger/passenger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    PassengerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
