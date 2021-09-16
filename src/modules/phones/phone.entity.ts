import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../clients/entities/client.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone_number: string;

  @ManyToOne(() => Client, (client) => client.phones)
  client: Client;
}
