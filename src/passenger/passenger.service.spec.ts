import { Test, TestingModule } from '@nestjs/testing';
import { PassengerService } from './passenger.service';
import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PhoneValidatorService } from 'src/phone-validator/phone-validator.service';

const passenger: Passenger = {
  id: uuid(),
  name: 'John Doe',
  createdAt: new Date(),
  phone: '5519991928157',
  ride: [],
};

describe('PassengerService', () => {
  let service: PassengerService;
  let repository: Repository<Passenger>;
  let phoneValidationService: PhoneValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassengerService,
        {
          provide: getRepositoryToken(Passenger),
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

    service = module.get<PassengerService>(PassengerService);
    repository = module.get<Repository<Passenger>>(getRepositoryToken(Passenger));
    phoneValidationService = module.get(PhoneValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(phoneValidationService).toBeDefined();
  });

  describe('suit tests to create passengers', () => {
    it('should be create a new passenger successfully', async () => {
      const data: CreatePassengerDto = {
        name: 'John Doe',
        phone: '5519991928157',
      };

      jest.spyOn(phoneValidationService, 'validateUniquePhone');
      jest.spyOn(repository, 'save').mockResolvedValue(passenger);
      const result = await service.create(data);

      expect(phoneValidationService.validateUniquePhone).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);

      expect(result).toEqual(passenger);
    });

    it('should throw BadRequestException if the phone already exists', async () => {
      const data: CreatePassengerDto = {
        name: 'John Doe',
        phone: '5519991928157',
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

      const createPassengerDto = { name: 'John Doe', phone: '123456789' };

      await expect(service.create(createPassengerDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
