import { Client } from 'src/modules/clients/entities/client.entity';
import { Realtor } from 'src/modules/realtor/entities/realtor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateMeeting: Date;

  @Column()
  idClient: number;

  @Column()
  idProperty: number;

  @ManyToOne(type => Client, schedule => Schedule)
  client: Client;

  @ManyToOne(type => Realtor, schedule => Schedule)
  realtor: Realtor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
