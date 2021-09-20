import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
