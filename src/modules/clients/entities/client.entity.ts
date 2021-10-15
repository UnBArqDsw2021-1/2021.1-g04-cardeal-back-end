import { Entity, OneToMany } from 'typeorm';
import { Person } from '../../person/person.entity';
import { Phone } from 'src/modules/phones/entities/phone.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';

@Entity()
export class Client extends Person {
  // owns property
  // @OneToMany(() => Phone, (phone) => phone.client, { cascade: true })
  // phones: Phone[];

  @OneToMany(type => Schedule, client => Client)
  schedule: Schedule;
}
