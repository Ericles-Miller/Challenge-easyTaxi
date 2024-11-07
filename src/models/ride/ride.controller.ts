import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { RideFullResponseDTO } from './dto/ride-full-response.dto';
import { RideShortResponseDTO } from './dto/ride-short-response.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  async create(@Body() createRideDto: CreateRideDto): Promise<RideShortResponseDTO> {
    return await this.rideService.create(createRideDto);
  }

  @Get()
  findAll() {
    return this.rideService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RideFullResponseDTO> {
    return await this.rideService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.rideService.update(+id, updateRideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rideService.remove(+id);
  }
}
