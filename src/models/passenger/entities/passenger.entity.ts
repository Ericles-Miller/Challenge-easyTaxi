import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/domain/generalEntities/base-entity';
import { Ride } from 'src/models/ride/entities/ride.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'passenger' })
export class Passenger extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  phone: string;

  @OneToMany(() => Ride, (ride) => ride.driver)
  ride: Ride[];

  constructor(name: string, phone: string) {
    super();
    this.name = name;
    this.phone = phone;
  }
}
