import { BaseEntity } from 'src/domain/GeneralEntities/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'passenger' })
export class Passenger extends BaseEntity {
  @Column()
  name: string;

  @Column()
  phone: string;

  constructor(name: string, phone: string) {
    super();
    this.name = name;
    this.phone = phone;
  }
}
