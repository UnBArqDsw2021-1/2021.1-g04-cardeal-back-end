import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Realtor } from '../../realtor/entities/realtor.entity';
import { Owner } from '../../owner/entities/owner.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone_number: string;

  // @ManyToOne(() => Client, (client) => client.phones, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // client: Client;

  // @ManyToOne(() => Realtor, (realtor) => realtor.phones, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // realtor: Realtor;

  // @ManyToOne(() => Owner, (owner) => owner.phones, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  owner: Owner;
}
