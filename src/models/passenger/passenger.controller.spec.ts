import { Test, TestingModule } from '@nestjs/testing';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { v4 as uuid } from 'uuid';
import { Passenger } from './entities/passenger.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

const passenger: Passenger = {
  id: uuid(),
  name: 'John Doe',
  createdAt: new Date(),
  phone: '5519991928157',
};

const mockService = {
  create: jest.fn(),
};

describe('PassengerController', () => {
  let controller: PassengerController;
  let service: PassengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengerController],
      providers: [
        {
          provide: PassengerService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PassengerController>(PassengerController);
    service = module.get<PassengerService>(PassengerService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('method create controller passenger', () => {
    it('should create a passenger successfully', async () => {
      const body: CreatePassengerDto = {
        name: 'John Doe',
        phone: '5519991928157',
      };

      mockService.create.mockResolvedValue(passenger);

      const result = await controller.create(body);

      expect(result).toEqual(passenger);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(body);
    });

    it('should return an object of type Passenger', async () => {
      const body: CreatePassengerDto = {
        name: 'Jo',
        phone: '5519991928157',
      };

      const result = await controller.create(body);

      expect(result).toEqual(passenger);
    });

    it('should throw Bad request error', async () => {
      const body: CreatePassengerDto = {
        name: 'Jo',
        phone: '5519991928157',
      };

      mockService.create.mockRejectedValue(
        new BadRequestException('Name must be at least 3 characters long'),
      );

      await expect(service.create(body)).rejects.toThrow(BadRequestException);
    });

    it('should throw Internal server Error', async () => {
      const body: CreatePassengerDto = {
        name: 'John Doe',
        phone: '5519991928157',
      };

      mockService.create.mockRejectedValue(
        new InternalServerErrorException('Unexpected server error to create a new passenger'),
      );

      await expect(service.create(body)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
