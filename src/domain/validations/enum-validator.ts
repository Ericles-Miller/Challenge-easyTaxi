import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EStatusRide } from '../enums/status-rides.enum';

function enumValidator(status: EStatusRide): boolean {
  if (status === EStatusRide.WAIT) return false;
  else {
    return true;
  }
}

@ValidatorConstraint({ async: false })
class IsEnumConstraint implements ValidatorConstraintInterface {
  validate(status: EStatusRide): Promise<boolean> | boolean {
    return enumValidator(status);
  }
  defaultMessage(): string {
    return 'It is not possible to set the status to Wait in this request';
  }
}

export function IsEnumValidToRequest(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEnumConstraint,
    });
  };
}
