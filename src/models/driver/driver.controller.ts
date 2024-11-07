import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Drivers')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({ summary: 'Create a new driver with data in request.' })
  @ApiResponse({ status: 201, description: 'driver created with success' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @ApiOperation({ summary: 'List all passenger' })
  @ApiResponse({ status: 200, description: 'list all passenger with success' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Get()
  async findAll(): Promise<Driver[]> {
    return await this.driverService.findAll();
  }

  @ApiOperation({ summary: 'List passenger by id' })
  @ApiResponse({ status: 200, description: 'list Passenger by id' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Driver> {
    return await this.driverService.findOne(id);
  }
}
