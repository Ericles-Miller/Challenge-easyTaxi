import { Test, TestingModule } from '@nestjs/testing';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { RideShortResponseDTO } from './dto/ride-short-response.dto';
import { format } from 'date-fns';
import { EStatusRide } from 'src/ride/enums/status-rides.enum';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { RideFullResponseDTO } from './dto/ride-full-response.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

const responseRide = new RideShortResponseDTO();
responseRide.id = '63736a53-b5ce-40f1-9b89-1849a9a1be52';
responseRide.createdAt = format(new Date(), 'dd/MM/yyyy - HH:mm');
responseRide.origin = 'My Home';
responseRide.destination = 'Ibirapuera Park';
responseRide.passenger = 'Mark';
responseRide.value = 50;
responseRide.status = EStatusRide.IN_PROGRESS;

const fullResponse = new RideFullResponseDTO();
fullResponse.id = '63736a53-b5ce-40f1-9b89-1849a9a1be52';
fullResponse.createdAt = format(new Date(), 'dd/MM/yyyy - HH:mm');
fullResponse.origin = 'My Home';
fullResponse.destination = 'Ibirapuera Park';
fullResponse.passenger = 'Mark';
fullResponse.value = 50;
fullResponse.status = EStatusRide.IN_PROGRESS;
fullResponse.driver = 'Frank';
fullResponse.startedAt = format(new Date(), 'dd/MM/yyyy - HH:mm');
fullResponse.finishedAt = format(new Date(), 'dd/MM/yyyy - HH:mm');

describe('RideController', () => {
  let controller: RideController;
  let service: RideService;

  const mockService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideController],
      providers: [
        {
          provide: RideService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<RideController>(RideController);
    service = module.get<RideService>(RideService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('method create controller ride', () => {
    it('should create a ride successfully', async () => {
      const body: CreateRideDto = {
        destination: 'Ibirapuera Park',
        origin: 'My Home',
        passengerId: '63736a53-b5ce-40f1-9b89-1849a9a1be52',
        value: 50,
      };

      mockService.create.mockReturnValue(responseRide);

      const result = await controller.create(body);

      expect(result).toBe(responseRide);
    });

    it('should throw Bad request error', async () => {
      const body: CreateRideDto = {
        destination: 'Ib',
        origin: 'My Home',
        passengerId: '63736a53-b5ce-40f1-9b89-1849a9a1be52',
        value: 50,
      };

      mockService.create.mockRejectedValue(
        new BadRequestException('destination must be at least 3 characters long'),
      );

      await expect(service.create(body)).rejects.toThrow(BadRequestException);
    });

    it('should throw Internal server Error', async () => {
      const body: CreateRideDto = {
        destination: 'Ib',
        origin: 'My Home',
        passengerId: '63736a53-b5ce-40f1-9b89-1849a9a1be52',
        value: 50,
      };
      mockService.create.mockRejectedValue(
        new InternalServerErrorException('Unexpected server error to create ride.'),
      );

      await expect(service.create(body)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('method findOne controller ride', () => {
    it('findOne list successfully', async () => {
      mockService.findOne.mockResolvedValue(fullResponse);

      const result = await controller.findOne('63736a53-b5ce-40f1-9b89-1849a9a1be52');

      expect(result).toBe(fullResponse);
    });

    it('should throw Bad request error', async () => {
      mockService.findOne.mockRejectedValue(new BadRequestException());

      await expect(service.findOne('63736a53-b5ce-40f1-9b89-1849a9a1be52')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw Internal server Error', async () => {
      mockService.findOne.mockRejectedValue(new InternalServerErrorException());

      await expect(service.findOne('63736a53-b5ce-40f1-9b89-1849a9a1be52')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('suit tests uodate controller ride', () => {
    it('update ride successfully', async () => {
      const data: UpdateRideDto = {
        driverId: '63736a53-b5ce-40f1-9b89-1849a9a1be52',
        status: EStatusRide.FINISHED,
      };

      await controller.update('63736a53-b5ce-40f1-9b89-1849a9a1be52', data);

      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should throw Bad request error', async () => {
      const data: UpdateRideDto = {
        driverId: '63736a53-b5ce-40f1-9b89-1849a9a1be52',
        status: EStatusRide.FINISHED,
      };

      mockService.update.mockRejectedValue(new BadRequestException());

      await expect(service.update('63736a53-b5ce-40f1-9b89-1849a9a1be52', data)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw Internal server Error', async () => {
      const data: UpdateRideDto = {
        driverId: '63736a53-b5ce-40f1-9b89-1849a9a1be52',
        status: EStatusRide.FINISHED,
      };

      mockService.update.mockRejectedValue(new InternalServerErrorException());

      await expect(service.update('63736a53-b5ce-40f1-9b89-1849a9a1be52', data)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
