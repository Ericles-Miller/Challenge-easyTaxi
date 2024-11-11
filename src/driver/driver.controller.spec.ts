import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

const driver: Driver = {
  id: 'd4c5593d-1c35-430c-bf64-ded0a548acbb',
  name: 'John Doe',
  createdAt: new Date(),
  phone: '5519991928157',
  car: 'Celta',
  ride: [],
};

const mockService = {
  create: jest.fn(),
};

describe('DriverController', () => {
  let controller: DriverController;
  let service: DriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        {
          provide: DriverService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DriverController>(DriverController);
    service = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('method create controller driver', () => {
    it('should create a driver successfully', async () => {
      const body: CreateDriverDto = {
        name: 'John Doe',
        phone: '5519991928157',
        car: 'Celta',
      };

      mockService.create.mockResolvedValue(driver);

      const result = await controller.create(body);

      expect(result).toEqual(driver);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(body);
    });

    it('should return an object of type driver', async () => {
      const body: CreateDriverDto = {
        name: 'Jo',
        phone: '5519991928157',
        car: 'Celta',
      };

      const result = await controller.create(body);

      expect(result).toEqual(driver);
    });

    it('should throw Bad request error', async () => {
      const body: CreateDriverDto = {
        name: 'Jo',
        phone: '5519991928157',
        car: 'Celta',
      };

      mockService.create.mockRejectedValue(
        new BadRequestException('Name must be at least 3 characters long'),
      );

      await expect(service.create(body)).rejects.toThrow(BadRequestException);
    });

    it('should throw Internal server Error', async () => {
      const body: CreateDriverDto = {
        name: 'John Doe',
        phone: '5519991928157',
        car: 'Celta',
      };

      mockService.create.mockRejectedValue(
        new InternalServerErrorException('Unexpected server error to create a new passenger'),
      );

      await expect(service.create(body)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
