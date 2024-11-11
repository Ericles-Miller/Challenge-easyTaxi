import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PhoneValidatorService } from 'src/phone-validator/phone-validator.service';

const driver: Driver = {
  id: 'd4c5593d-1c35-430c-bf64-ded0a548acbb',
  name: 'John Doe',
  createdAt: new Date(),
  phone: '5519991928157',
  car: 'Celta',
  ride: [],
};

describe('DriverService', () => {
  let service: DriverService;
  let repository: Repository<Driver>;
  let phoneValidationService: PhoneValidatorService;

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
        {
          provide: PhoneValidatorService,
          useValue: {
            validateUniquePhone: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
    repository = module.get<Repository<Driver>>(getRepositoryToken(Driver));

    phoneValidationService = module.get(PhoneValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(phoneValidationService).toBeDefined();
  });

  describe('suit tests to create passengers', () => {
    it('should be create a new passenger successfully', async () => {
      const data: CreateDriverDto = {
        name: 'John Doe',
        phone: '5519991928157',
        car: 'Celta',
      };

      jest.spyOn(repository, 'save').mockResolvedValue(driver);
      jest.spyOn(phoneValidationService, 'validateUniquePhone');
      const result = await service.create(data);

      expect(phoneValidationService.validateUniquePhone).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);

      expect(result).toEqual(driver);
    });

    it('should throw BadRequestException if the phone already exists', async () => {
      const data: CreateDriverDto = {
        name: 'John Doe',
        phone: '5519991928157',
        car: 'Celta',
      };

      jest
        .spyOn(phoneValidationService, 'validateUniquePhone')
        .mockRejectedValue(new BadRequestException('The phone already exists to other passenger.'));

      await expect(service.create(data)).rejects.toThrow(
        new BadRequestException('The phone already exists to other passenger.'),
      );
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValue(new Error('Database failure'));
      jest.spyOn(phoneValidationService, 'validateUniquePhone').mockRejectedValue(new Error());

      const createDriverDto = { name: 'John Doe', phone: '123456789', car: 'Celta' };

      await expect(service.create(createDriverDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
