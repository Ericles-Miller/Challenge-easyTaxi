import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base-entity';
import { Ride } from 'src/ride/entities/ride.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'driver' })
export class Driver extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  phone: string;

  @Column()
  @ApiProperty()
  car: string;

  @OneToMany(() => Ride, (ride) => ride.driver)
  ride: Ride[];

  constructor(name: string, phone: string, car: string) {
    super();
    this.name = name;
    this.phone = phone;
    this.car = car;
  }
}
