import { validate } from 'class-validator';
import { CreateRideDto } from './create-ride.dto';

describe('CreateRideDTO tests', () => {
  it.each([
    ['My Home', 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My H', 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['M'.repeat(100), 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
  ])('should valid origin', async (origin, destination, value, passengerId) => {
    const dto = new CreateRideDto();

    dto.origin = origin;
    dto.destination = destination;
    dto.value = value;
    dto.passengerId = passengerId;

    const erros = await validate(dto);
    expect(erros.length).toBe(0);
  });

  it.each([
    ['My', 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['M'.repeat(101), 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['', 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    [null, 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
  ])('should invalid origin', async (origin, destination, value, passengerId) => {
    const dto = new CreateRideDto();

    dto.origin = origin;
    dto.destination = destination;
    dto.value = value;
    dto.passengerId = passengerId;

    const erros = await validate(dto);
    expect(erros.length).toBe(1);
  });

  it.each([
    ['My Home', 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ibi', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'i'.repeat(100), 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
  ])('should valid destination', async (origin, destination, value, passengerId) => {
    const dto = new CreateRideDto();

    dto.origin = origin;
    dto.destination = destination;
    dto.value = value;
    dto.passengerId = passengerId;

    const erros = await validate(dto);
    expect(erros.length).toBe(0);
  });

  it.each([
    ['My Home', '', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ib', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', null, 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'I'.repeat(101), 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
  ])('should invalid destination', async (origin, destination, value, passengerId) => {
    const dto = new CreateRideDto();

    dto.origin = origin;
    dto.destination = destination;
    dto.value = value;
    dto.passengerId = passengerId;

    const erros = await validate(dto);
    expect(erros.length).toBe(1);
  });

  it.each([
    ['My Home', 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ibirapuera Park', 50.23, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ibirapuera Park', 5000, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ibirapuera Park', 0.1, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
  ])('should valid value', async (origin, destination, value, passengerId) => {
    const dto = new CreateRideDto();

    dto.origin = origin;
    dto.destination = destination;
    dto.value = value;
    dto.passengerId = passengerId;

    const erros = await validate(dto);
    expect(erros.length).toBe(0);
  });

  it.each([
    ['My Home', 'Ibirapuera Park', 0, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ibirapuera Park', 50.23324, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ibirapuera Park', -15000, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ibirapuera Park', 0.0, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
  ])('should invalid value', async (origin, destination, value, passengerId) => {
    const dto = new CreateRideDto();

    dto.origin = origin;
    dto.destination = destination;
    dto.value = value;
    dto.passengerId = passengerId;

    const erros = await validate(dto);
    expect(erros.length).toBe(1);
  });

  it.each([
    ['My Home', 'Ibirapuera Park', 50, 'd4c5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ibirapuera Park', 50, 'd4C5593D-1C35-430C-BF64-DED0A548ACBB'],
  ])('should valid passengerId', async (origin, destination, value, passengerId) => {
    const dto = new CreateRideDto();

    dto.origin = origin;
    dto.destination = destination;
    dto.value = value;
    dto.passengerId = passengerId;

    const erros = await validate(dto);
    expect(erros.length).toBe(0);
  });

  it.each([
    ['My Home', 'Ibirapuera Park', 50, 'd4M5593d-1c35-430c-bf64-ded0a548acbb'],
    ['My Home', 'Ibirapuera Park', 50, ''],
    ['My Home', 'Ibirapuera Park', 50, null],
    ['My Home', 'Ibirapuera Park', 50, 'ANY MORE'],
  ])('should invalid value', async (origin, destination, value, passengerId) => {
    const dto = new CreateRideDto();

    dto.origin = origin;
    dto.destination = destination;
    dto.value = value;
    dto.passengerId = passengerId;

    const erros = await validate(dto);
    expect(erros.length).toBe(1);
  });
});
