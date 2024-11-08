import { Test, TestingModule } from '@nestjs/testing';
import { PassengerService } from './passenger.service';
import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

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
      ],
    }).compile();

    service = module.get<PassengerService>(PassengerService);
    repository = module.get<Repository<Passenger>>(getRepositoryToken(Passenger));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('suit test to create passengers', () => {
    it('should be create a new passenger successfully', async () => {
      const data: CreatePassengerDto = {
        name: 'John Doe',
        phone: '5519991928157',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'save').mockResolvedValue(passenger);
      const result = await service.create(data);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);

      expect(result).toEqual(passenger);
    });

    it('should throw BadRequestException if the phone already exists', async () => {
      const data: CreatePassengerDto = {
        name: 'John Doe',
        phone: '5519991928157',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue({
        id: 'd4c5593d-1c35-430c-bf64-ded0a548acbb',
        name: 'other name',
        createdAt: new Date(),
        phone: '5519991928157',
        ride: [],
      });

      await expect(service.create(data)).rejects.toThrow(
        new BadRequestException('The phone already exists to other passenger.'),
      );
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValue(new Error('Database failure'));

      const createPassengerDto = { name: 'John Doe', phone: '123456789' };

      await expect(service.create(createPassengerDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
