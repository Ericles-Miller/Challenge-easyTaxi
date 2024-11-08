import { Test, TestingModule } from '@nestjs/testing';
import { RideService } from './ride.service';
import { Ride } from './entities/ride.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from '../passenger/entities/passenger.entity';
import { CreateRideDto } from './dto/create-ride.dto';
import { RideShortResponseDTO } from './dto/ride-short-response.dto';
import { format } from 'date-fns';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { RideFullResponseDTO } from './dto/ride-full-response.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { EStatusRide } from 'src/domain/enums/status-rides.enum';

describe('RideService', () => {
  let service: RideService;
  let rideRepository: Repository<Ride>;
  let driverRepository: Repository<Driver>;
  let passengerRepository: Repository<Passenger>;

  const ride = new Ride('My Home', 'Ibirapuera Park', 50, 'aba12fea-c6de-4377-840e-b78a1e5ec6fd');
  const passenger: Passenger = {
    createdAt: new Date(),
    id: 'd4c5593d-1c35-430c-bf64-ded0a548acbb',
    name: 'John Doe',
    phone: '5519991928157',
    ride: [],
  };

  const drive: Driver = {
    id: 'aba12fea-c6de-4377-840e-b78a1e5ec6fd',
    car: 'Celta',
    createdAt: new Date(),
    name: 'Mark',
    phone: '32212011',
    ride: [],
  };

  ride.driver = drive;

  const responseRide = new RideShortResponseDTO();
  responseRide.id = ride.id;
  responseRide.createdAt = ride.createdAt ? format(ride.createdAt, 'dd/MM/yyyy - HH:mm') : null;
  responseRide.origin = ride.origin;
  responseRide.destination = ride.destination;
  responseRide.passenger = ride.getNamePassenger();
  responseRide.value = ride.value;
  responseRide.status = ride.status;

  const fullResponse = new RideFullResponseDTO();
  fullResponse.id = ride.id;
  fullResponse.createdAt = ride.createdAt ? format(ride.createdAt, 'dd/MM/yyyy - HH:mm') : null;
  fullResponse.origin = ride.origin;
  fullResponse.destination = ride.destination;
  fullResponse.passenger = ride.getNamePassenger();
  fullResponse.value = ride.value;
  fullResponse.status = ride.status;
  fullResponse.driver = ride.driver.name;
  fullResponse.startedAt = ride.startedAt ? format(ride.startedAt, 'dd/MM/yyyy - HH:mm') : null;
  fullResponse.finishedAt = ride.finishedAt ? format(ride.finishedAt, 'dd/MM/yyyy - HH:mm') : null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RideService,
        {
          provide: getRepositoryToken(Ride),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Driver),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Passenger),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RideService>(RideService);
    driverRepository = module.get<Repository<Driver>>(getRepositoryToken(Driver));
    passengerRepository = module.get<Repository<Passenger>>(getRepositoryToken(Passenger));
    rideRepository = module.get<Repository<Ride>>(getRepositoryToken(Ride));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(rideRepository).toBeDefined();
    expect(passengerRepository).toBeDefined();
    expect(driverRepository).toBeDefined();
  });

  describe('suit test to create a new ride', () => {
    it('should be create a new ride successfully', async () => {
      const data: CreateRideDto = {
        destination: 'Ibirapuera Park',
        origin: 'My Home',
        passengerId: 'aba12fea-c6de-4377-840e-b78a1e5ec6fd',
        value: 50,
      };

      jest.spyOn(passengerRepository, 'findOne').mockResolvedValue(passenger);
      jest.spyOn(rideRepository, 'save').mockResolvedValue(ride);

      const result = await service.create(data);
      expect(passengerRepository.findOne).toHaveBeenCalledTimes(1);
      expect(rideRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(responseRide);
    });

    it('should throw BadRequestException if passenger id does not exists', async () => {
      const data: CreateRideDto = {
        destination: 'Ibirapuera Park',
        origin: 'My Home',
        passengerId: 'aba12fea-c6de-4377-840e-b78a1e5ec6fd',
        value: 50,
      };

      jest.spyOn(passengerRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(data)).rejects.toThrow(
        new BadRequestException('Passenger id does not exists.'),
      );
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      const data: CreateRideDto = {
        destination: 'Ibirapuera Park',
        origin: 'My Home',
        passengerId: 'aba12fea-c6de-4377-840e-b78a1e5ec6fd',
        value: 50,
      };
      jest.spyOn(passengerRepository, 'findOne').mockResolvedValue(passenger);
      jest
        .spyOn(rideRepository, 'save')
        .mockRejectedValue(new InternalServerErrorException('Database failure'));

      await expect(service.create(data)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('Suit test to list Ride By Id', () => {
    it('shoul list ride by id Successfully', async () => {
      jest.spyOn(rideRepository, 'findOne').mockResolvedValue(ride);

      const result = await service.findOne('aba12fea-c6de-4377-840e-b78a1e5ec6fd');
      expect(result).toEqual(fullResponse);
    });

    it('shoul throw BadRequestException if ride id does not exists', async () => {
      jest.spyOn(rideRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('aba12fea-c6de-4377-840e-b78a1e5ec6fd')).rejects.toThrow(
        new BadRequestException('id of ride is incorrect.'),
      );
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      jest
        .spyOn(rideRepository, 'findOne')
        .mockRejectedValue(new InternalServerErrorException('Database failure'));

      await expect(service.findOne('aba12fea-c6de-4377-840e-b78a1e5ec6fd')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('Suit test to update ride', () => {
    it('should be update a ride with status IN_PROGRESS successfully', async () => {
      const data: UpdateRideDto = {
        driverId: 'aba12fea-c6de-4377-840e-b78a1e5ec6fd',
        status: EStatusRide.IN_PROGRESS,
      };

      const rideUpdate = new Ride('My Home', 'Ibirapuera Park', 50, 'aba12fea-c6de-4377-840e-b78a1e5ec6fd');

      jest.spyOn(rideRepository, 'findOne').mockResolvedValue(rideUpdate);
      jest.spyOn(driverRepository, 'findOne').mockResolvedValue(drive);
      jest.spyOn(rideRepository, 'update');

      await service.update('aba12fea-c6de-4377-840e-b78a1e5ec6fd', data);

      expect(rideUpdate.driver).toBe(undefined);
      expect(data.status).toBe(EStatusRide.IN_PROGRESS);
    });

    it('should be update a ride with status FINISHED successfully', async () => {
      const data: UpdateRideDto = {
        driverId: 'aba12fea-c6de-4377-840e-b78a1e5ec6fd',
        status: EStatusRide.FINISHED,
      };

      const rideUpdate = new Ride('My Home', 'Ibirapuera Park', 50, 'aba12fea-c6de-4377-840e-b78a1e5ec6fd');
      rideUpdate.driver = drive;
      rideUpdate.status = EStatusRide.IN_PROGRESS;

      jest.spyOn(rideRepository, 'findOne').mockResolvedValue(rideUpdate);
      jest.spyOn(driverRepository, 'findOne').mockResolvedValue(drive);
      jest.spyOn(rideRepository, 'update');

      await service.update('aba12fea-c6de-4377-840e-b78a1e5ec6fd', data);

      expect(rideUpdate.driver).toBe(drive);
      expect(data.status).toBe(EStatusRide.FINISHED);
    });

    it('should throw BadRequestException if ride id does not exists', async () => {
      const data: UpdateRideDto = {
        driverId: 'aba12fea-c6de-4377-840e-b78a1e5ec6fd',
        status: EStatusRide.FINISHED,
      };

      jest.spyOn(rideRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update('aba12fea-c6de-4377-840e-b78a1e5ec6fd', data)).rejects.toThrow(
        new BadRequestException('Does not exists ride with id.'),
      );
    });

    it('should throw BadRequestException if driver id is different ride.id', async () => {
      const data: UpdateRideDto = {
        driverId: '63736a53-b5ce-40f1-9b89-1849a9a1be52',
        status: EStatusRide.FINISHED,
      };

      jest.spyOn(rideRepository, 'findOne').mockResolvedValue(ride);

      await expect(service.update('aba12fea-c6de-4377-840e-b78a1e5ec6fd', data)).rejects.toThrow(
        new BadRequestException('This ride already has a driver.'),
      );
    });

    it('should throw BadRequestException if status is equal FINISHED', async () => {
      const data: UpdateRideDto = {
        driverId: 'aba12fea-c6de-4377-840e-b78a1e5ec6fd',
        status: EStatusRide.FINISHED,
      };

      const rideUpdate = new Ride('My Home', 'Ibirapuera Park', 50, 'aba12fea-c6de-4377-840e-b78a1e5ec6fd');
      rideUpdate.driver = drive;
      rideUpdate.status = EStatusRide.FINISHED;

      jest.spyOn(rideRepository, 'findOne').mockResolvedValue(rideUpdate);
      jest.spyOn(driverRepository, 'findOne').mockResolvedValue(drive);

      await expect(service.update('aba12fea-c6de-4377-840e-b78a1e5ec6fd', data)).rejects.toThrow(
        new BadRequestException('It is not possible to change the status of a completed ride.'),
      );
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      const data: UpdateRideDto = {
        driverId: 'aba12fea-c6de-4377-840e-b78a1e5ec6fd',
        status: EStatusRide.FINISHED,
      };

      jest
        .spyOn(rideRepository, 'findOne')
        .mockRejectedValue(new InternalServerErrorException('Database failure'));

      await expect(service.update('aba12fea-c6de-4377-840e-b78a1e5ec6fd', data)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
