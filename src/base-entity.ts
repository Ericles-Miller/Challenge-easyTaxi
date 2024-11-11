import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class BaseEntity {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  constructor() {
    this.id = uuid();
    this.createdAt = new Date();
  }
}
