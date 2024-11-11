import { validate } from 'class-validator';
import { CreatePassengerDto } from './create-passenger.dto';

describe('CreatePassengerDto', () => {
  describe('name field', () => {
    it.each([
      ['John Doe', '+55 (19) 991928543'],
      ['Joh', '+55 (19) 991928543'],
      ['Lúcio Malveira', '+55 (19) 991928543'],
      ['João Alves', '+55 (19) 991928543'],
      ['Bete Paraguaçu', '+55 (19) 991928543'],
      ['a'.repeat(100), '+55 (19) 991928543'],
    ])('should valid names', async (name, phone) => {
      const dto = new CreatePassengerDto();
      dto.name = name;
      dto.phone = phone;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it.each([
      ['Jo', '+55 (19) 991928543'],
      ['J'.repeat(101), '+55 (19) 991928543'],
      ['!@$%(*@', '+55 (19) 991928543'],
      ['', '+55 (19) 991928543'],
      [null, '+55 (19) 991928543'],
      ['123444', '+55 (19) 991928543'],
    ])('should invalid names', async (name, phone) => {
      const dto = new CreatePassengerDto();
      dto.name = name;
      dto.phone = phone;

      const errors = await validate(dto);
      expect(errors.length).toBe(1);
    });
  });

  describe('phone field', () => {
    it.each([
      ['John Doe', '+55 (19) 991928543'],
      ['John Doe', '+55-19-9-9192-8543'],
      ['John Doe', '55(19)991928543'],
      ['John Doe', '55 19 991928543'],
      ['John Doe', '+55(19)99192-8543'],
      ['John Doe', '+55 (19)99192-8543'],
      ['John Doe', '55 (19)99192-8543'],
    ])('should valid phone', async (name, phone) => {
      const dto = new CreatePassengerDto();
      dto.name = name;
      dto.phone = phone;

      const errors = await validate(dto);

      expect(errors.length).toBe(0);
    });

    it.each([
      ['John Doe', '+55 (19) 991928%%%43'],
      ['John Doe', '+8543'],
      ['John Doe', 'qwerertrtyr'],
      ['John Doe', '55'.repeat(50)],
    ])('should invalid phone', async (name, phone) => {
      const dto = new CreatePassengerDto();
      dto.name = name;
      dto.phone = phone;

      const errors = await validate(dto);

      expect(errors.length).toBe(1);
    });
  });
});
