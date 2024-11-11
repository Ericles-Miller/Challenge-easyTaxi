import { Controller, Get, Post, Body, Patch, Param, HttpCode } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { RideFullResponseDTO } from './dto/ride-full-response.dto';
import { RideShortResponseDTO } from './dto/ride-short-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Rides')
@Controller('rides')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @ApiOperation({
    summary: 'create ride',
    description: `

    sample request to create a ride
    POST /rides
    body : {
      "origin": "My Home",
      "destination": "Ibirapuera Park",
      "value": 50,00,
      "passengerId": "d4c5593d-1c35-430c-bf64-ded0a548acbb"
    }
  `,
  })
  @ApiResponse({
    status: 201,
    description: 'create ride successfully',
    type: RideShortResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Erro de requisição. Erros de validação ou dados inválidos.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro Interno do Servidor. Algo deu errado no servidor.',
  })
  @Post()
  @HttpCode(201)
  async create(@Body() createRideDto: CreateRideDto): Promise<RideShortResponseDTO> {
    return await this.rideService.create(createRideDto);
  }

  @ApiOperation({
    summary: 'list ride by id',
    description: `

      sample request to list ride by id
      GET /rides/d4c5593d-1c35-430c-bf64-ded0a548acbb
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'list ride by id successfully',
    type: RideFullResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RideFullResponseDTO> {
    return await this.rideService.findOne(id);
  }

  @ApiOperation({
    summary: 'update ride',
    description: `
      description: this endpoint will be to update data as the race in progresses

      sample request to start the ride
      PATCH /rides/d4c5593d-1c35-430c-bf64-ded0a548acbb
      body : {
        "driverId": "d4c5593d-1c35-430c-bf64-ded0a548acbb",
        "status": "IN_PROGRESS"
      }

      sample request to finished the ride
      PATCH /rides/d4c5593d-1c35-430c-bf64-ded0a548acbb
      body : {
        "driverId": "d4c5593d-1c35-430c-bf64-ded0a548acbb",
        "status": "FINISHED"
      }
    `,
  })
  @ApiResponse({
    status: 204,
    description: 'update ride successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Patch(':id')
  @HttpCode(204)
  async update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto): Promise<void> {
    return await this.rideService.update(id, updateRideDto);
  }
}
