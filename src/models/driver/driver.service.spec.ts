import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

const driver: Driver = {
  id: 'd4c5593d-1c35-430c-bf64-ded0a548acbb',
  name: 'John Doe',
  createdAt: new Date(),
  phone: '5519991928157',
  car: 'Celta',
};

describe('DriverService', () => {
  let service: DriverService;
  let repository: Repository<Driver>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: getRepositoryToken(Driver),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
    repository = module.get<Repository<Driver>>(getRepositoryToken(Driver));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('suit test to create passengers', () => {
    it('should be create a new passenger successfully', async () => {
      const data: CreateDriverDto = {
        name: 'John Doe',
        phone: '5519991928157',
        car: 'Celta',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'save').mockResolvedValue(driver);
      const result = await service.create(data);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);

      expect(result).toEqual(driver);
    });

    it('should throw BadRequestException if the phone already exists', async () => {
      const data: CreateDriverDto = {
        name: 'John Doe',
        phone: '5519991928157',
        car: 'Celta',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue({
        id: 'd4c5593d-1c35-430c-bf64-ded0a548acbb',
        name: 'other name',
        createdAt: new Date(),
        phone: '5519991928157',
        car: 'Celta',
      });

      await expect(service.create(data)).rejects.toThrow(
        new BadRequestException('This phone already exists to other user.'),
      );
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValue(new Error('Database failure'));

      const createDriverDto = { name: 'John Doe', phone: '123456789', car: 'Celta' };

      await expect(service.create(createDriverDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
