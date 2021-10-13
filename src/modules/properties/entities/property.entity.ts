import { Owner } from 'src/modules/owner/entities/owner.entity';
import { Realtor } from 'src/modules/realtor/entities/realtor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  zipNumber: string;

  @Column()
  type: string;

  @Column()
  size: string;

  @Column()
  numberBedroom: number;

  @Column()
  numberBath: number;

  @Column()
  numberPark: number;

  @Column()
  status: string;

  @Column()
  value: number;

  @Column()
  viewed: number;

  @Column()
  idOwner: number;

  @Column()
  idRealtor: number;

  @ManyToOne(type => Owner, properties => Property)
  owner: Owner;

  @ManyToOne(type => Realtor, properties => Property)
  realtor: Realtor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
