import { EStatusRide } from 'src/domain/enums/status-rides.enum';
import { BaseEntity } from 'src/domain/generalEntities/base-entity';
import { Driver } from 'src/models/driver/entities/driver.entity';
import { Passenger } from 'src/models/passenger/entities/passenger.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'ride' })
export class Ride extends BaseEntity {
  @Column()
  status: EStatusRide;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  startedAt?: Date;

  @Column()
  finishedAt?: Date;

  @Column()
  value: number;

  @Column()
  passengerId: string;

  @Column()
  driverId?: string;

  @ManyToOne(() => Driver, (driver) => driver.ride)
  @JoinColumn({ name: 'driverId' })
  driver: Driver[];

  @ManyToOne(() => Passenger, (passenger) => passenger.ride)
  @JoinColumn({ name: 'passengerId' })
  passenger: Passenger[];

  constructor(origin: string, destination: string, value: number, passengerId: string) {
    super();
    this.origin = origin;
    this.destination = destination;
    this.passengerId = passengerId;
    this.value = value;
    this.setStatusRide(EStatusRide.WAIT);
  }

  setStartedAt(): void {
    this.startedAt = new Date();
  }

  setFinishedAt(): void {
    this.finishedAt = new Date();
  }

  setStatusRide(status: EStatusRide): void {
    this.status = status;
  }

  setDriverId(driverId: string): void {
    this.driverId = driverId;
  }
}
