import { validate } from 'class-validator';
import { CreateDriverDto } from './create-driver.dto';

describe('CreatePassengerDto', () => {
  describe('name field', () => {
    it.each([
      ['John Doe', '+55 (19) 991928543', 'Celta'],
      ['Joh', '+55 (19) 991928543', 'Celta'],
      ['Lúcio Malveira', '+55 (19) 991928543', 'Celta'],
      ['João Alves', '+55 (19) 991928543', 'Celta'],
      ['Bete Paraguaçu', '+55 (19) 991928543', 'Celta'],
      ['a'.repeat(100), '+55 (19) 991928543', 'Celta'],
    ])('should valid names', async (name, phone, car) => {
      const dto = new CreateDriverDto();
      dto.name = name;
      dto.phone = phone;
      dto.car = car;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it.each([
      ['Jo', '+55 (19) 991928543', 'Celta'],
      ['J'.repeat(101), '+55 (19) 991928543', 'Celta'],
      ['!@$%(*@', '+55 (19) 991928543', 'Celta'],
      ['', '+55 (19) 991928543', 'Celta'],
      [null, '+55 (19) 991928543', 'Celta'],
      ['123444', '+55 (19) 991928543', 'Celta'],
    ])('should invalid names', async (name, phone, car) => {
      const dto = new CreateDriverDto();
      dto.name = name;
      dto.phone = phone;
      dto.car = car;

      const errors = await validate(dto);
      expect(errors.length).toBe(1);
    });
  });

  describe('phone field', () => {
    it.each([
      ['John Doe', '+55 (19) 991928543', 'Celta'],
      ['John Doe', '+55-19-9-9192-8543', 'Celta'],
      ['John Doe', '55(19)991928543', 'Celta'],
      ['John Doe', '55 19 991928543', 'Celta'],
      ['John Doe', '+55(19)99192-8543', 'Celta'],
      ['John Doe', '+55 (19)99192-8543', 'Celta'],
      ['John Doe', '55 (19)99192-8543', 'Celta'],
    ])('should valid phone', async (name, phone, car) => {
      const dto = new CreateDriverDto();
      dto.name = name;
      dto.phone = phone;
      dto.car = car;

      const errors = await validate(dto);

      expect(errors.length).toBe(0);
    });

    it.each([
      ['John Doe', '+55 (19) 991928%%%43', 'Celta'],
      ['John Doe', '+8543', 'Celta'],
      ['John Doe', 'qwerertrtyr', 'Celta'],
      ['John Doe', '55'.repeat(50), 'Celta'],
    ])('should invalid phone', async (name, phone, car) => {
      const dto = new CreateDriverDto();
      dto.name = name;
      dto.phone = phone;
      dto.car = car;

      const errors = await validate(dto);

      expect(errors.length).toBe(1);
    });

    it.each([
      ['John Doe', '+55 (19) 991928543', 'Celta'],
      ['Joh', '+55 (19) 991928543', 'a'.repeat(30)],
      ['Lúcio Malveira', '+55 (19) 991928543', 'c4 pallas'],
      ['João Alves', '+55 (19) 991928543', 'Frontier'],
    ])('should valid car', async (name, phone, car) => {
      const dto = new CreateDriverDto();
      dto.name = name;
      dto.car = car;
      dto.phone = phone;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it.each([
      ['John Doe', '+55 (19) 991928543', ''],
      ['Joh', '+55 (19) 991928543', 'a'.repeat(36)],
      ['Lúcio Malveira', '+55 (19) 991928543', null],
      ['João Alves', '+55 (19) 991928543', 'ce'],
      ['João Alves', '+55 (19) 991928543', '@#$FSCCC'],
    ])('should invalid car', async (name, phone, car) => {
      const dto = new CreateDriverDto();
      dto.name = name;
      dto.car = car;
      dto.phone = phone;

      const errors = await validate(dto);
      expect(errors.length).toBe(1);
    });
  });
});
