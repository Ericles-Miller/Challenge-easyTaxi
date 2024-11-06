import { Controller, Post, Body } from '@nestjs/common';
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
  async create(
    @Body() createPassengerDto: CreatePassengerDto,
  ): Promise<Passenger> {
    return await this.passengerService.create(createPassengerDto);
  }
}
