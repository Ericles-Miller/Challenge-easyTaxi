import { BaseEntity } from 'src/domain/GeneralEntities/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'driver' })
export class Driver extends BaseEntity {
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  car: string;

  constructor(name: string, phone: string, car: string) {
    super();
    this.name = name;
    this.phone = phone;
    this.car = car;
  }
}
