import { Controller, Post, Body, Get, Param, HttpCode } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Passenger } from './entities/passenger.entity';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @ApiOperation({
    summary: 'Create a new passenger with data in request.',
    description: `
    sample request to create a passenger
    POST /passengers
    body : {
      "name": "John Doe",
      "phone": "32212015",
    }
    `,
  })
  @ApiResponse({ status: 201, description: 'Passenger created with success', type: Passenger })
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
  async create(@Body() createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    return await this.passengerService.create(createPassengerDto);
  }

  @ApiOperation({
    summary: 'List all passenger',
    description: `
    sample request to list all passenger
    GET /passengers
    `,
  })
  @ApiResponse({ status: 200, description: 'list all passenger with success', type: [Passenger] })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @HttpCode(200)
  @Get()
  async findAll(): Promise<Passenger[]> {
    return await this.passengerService.findAll();
  }

  @ApiOperation({
    summary: 'List passenger by id',
    description: `
    sample request to list passenger by id
    GET /passengers/63736a53-b5ce-40f1-9b89-1849a9a1be52
    `,
  })
  @ApiResponse({ status: 200, description: 'list Passenger by id', type: Passenger })
  @ApiResponse({
    status: 404,
    description: 'Not Found Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Passenger> {
    return await this.passengerService.findOne(id);
  }
}
