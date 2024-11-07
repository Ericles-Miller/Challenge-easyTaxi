import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Passenger } from './entities/passenger.entity';

@ApiTags('Passengers')
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @ApiOperation({ summary: 'Create a new passenger with data in request.' })
  @ApiResponse({ status: 201, description: 'Passenger created with success' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Post()
  async create(@Body() createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    return await this.passengerService.create(createPassengerDto);
  }

  @ApiOperation({ summary: 'List all passenger' })
  @ApiResponse({ status: 200, description: 'list all passenger with success' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Get()
  async findAll(): Promise<Passenger[]> {
    return await this.passengerService.findAll();
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
  async findOne(@Param('id') id: string): Promise<Passenger> {
    return await this.passengerService.findOne(id);
  }
}
