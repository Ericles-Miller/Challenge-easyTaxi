import { Column } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';

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
