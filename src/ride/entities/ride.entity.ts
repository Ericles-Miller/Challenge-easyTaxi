import { EStatusRide } from 'src/ride/enums/status-rides.enum';
import { BaseEntity } from 'src/base-entity';
import { Driver } from 'src/driver/entities/driver.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
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

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column()
  passengerId: string;

  @Column()
  driverId?: string;

  @ManyToOne(() => Driver, (driver) => driver.ride)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @ManyToOne(() => Passenger, (passenger) => passenger.ride)
  @JoinColumn({ name: 'passengerId' })
  passenger: Passenger;

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

  getNamePassenger(): string | null {
    return this.passenger ? this.passenger.name : null;
  }
}
