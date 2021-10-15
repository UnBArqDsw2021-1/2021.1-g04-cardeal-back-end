import { Column, Entity, OneToMany } from 'typeorm';
import { Person } from '../../person/person.entity';
import { Phone } from 'src/modules/phones/entities/phone.entity';
import { Property } from 'src/modules/properties/entities/property.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';

@Entity()
export class Realtor extends Person {
  @Column()
  password: string;

  // @OneToMany(() => Phone, (phone) => phone.realtor, { cascade: true })
  // phones: Phone[];

  @OneToMany(type => Property, realtor => Realtor)
  properties: Property[];

  @OneToMany(type => Schedule, realtor => Realtor)
  schedule: Schedule;
}
