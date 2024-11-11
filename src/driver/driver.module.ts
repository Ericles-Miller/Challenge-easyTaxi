import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { PhoneValidatorModule } from 'src/phone-validator/phone-validator.module';

@Module({
  imports: [TypeOrmModule.forFeature([Driver]), PhoneValidatorModule],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
