import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({
    summary: 'Create a new driver with data in request.',
    description: `
    sample request to create a driver
    POST /drivers
    example body : {
      "name": "John Doe",
      "phone": "32212015",
      "car": 'Celta',
    }
    `,
  })
  @ApiResponse({ status: 201, description: 'driver created with success', type: Driver })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Post()
  @HttpCode(201)
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @ApiOperation({
    summary: 'List all passenger',
    description: `
    sample request to list all drivers
    GET /drivers
    `,
  })
  @ApiResponse({ status: 200, description: 'list all passenger with success', type: [Driver] })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @HttpCode(200)
  @Get()
  async findAll(): Promise<Driver[]> {
    return await this.driverService.findAll();
  }

  @ApiOperation({
    summary: 'List passenger by id',
    description: `
    sample request to list driver by id
    GET /drivers/63736a53-b5ce-40f1-9b89-1849a9a1be52
    `,
  })
  @ApiResponse({ status: 200, description: 'list Passenger by id', type: Driver })
  @ApiResponse({
    status: 404,
    description: 'Not Found Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<Driver> {
    return await this.driverService.findOne(id);
  }
}
