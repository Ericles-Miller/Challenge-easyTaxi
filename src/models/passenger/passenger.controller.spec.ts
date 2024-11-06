import { Test, TestingModule } from '@nestjs/testing';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { v4 as uuid } from 'uuid';
import { Passenger } from './entities/passenger.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';

const passenger: Passenger = {
  id: uuid(),
  name: 'John Doe',
  createdAt: new Date(),
  phone: '5519991928157',
};

describe('PassengerController', () => {
  let controller: PassengerController;
  let service: PassengerService;

  let body: CreatePassengerDto;

  const requestMock = {
    body,
  };

  const statusResponseMock = {
    send: jest.fn((x) => x),
  };

  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengerController],
      providers: [
        {
          provide: PassengerService,
          useValue: {
            create: jest.fn().mockResolvedValue(passenger),
          },
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

  // describe('method create controller passenger', () => {
  //   it('should create a passenger successfully', async () => {
  //     const body: CreatePassengerDto = {
  //       name: 'John Doe',
  //       phone: '5519991928157',
  //     };

  //     const result = await controller.create(body);

  //     expect(result).toEqual(passenger);
  //     expect(service.create).toHaveBeenCalledTimes(1);
  //     expect(service.create).toHaveBeenCalledWith(body);
  //   });

  //   it('should return an object of type Passenger', async () => {
  //     const body: CreatePassengerDto = {
  //       name: 'John Doe',
  //       phone: '5519991928157',
  //     };

  //     const result = await controller.create(body);

  //     expect(result).toEqual(passenger);
  //   });
  // });

  describe('should return status code', () => {
    it('should return status 201 when a passenger is created successfully', async () => {});

    it('should return status 400 when validation fails (invalid input)', async () => {
      const createPassengerDto: CreatePassengerDto = {
        name: '',
        phone: '+5538991928653',
      };

      requestMock.body = createPassengerDto;

      await controller.create(requestMock.body);
      expect(responseMock.status).toHaveBeenCalledWith(400);
    });
  });
});
