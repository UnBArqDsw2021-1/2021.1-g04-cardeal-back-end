import { Entity, OneToMany } from 'typeorm';
import { Person } from '../../person/person.entity';
import { Phone } from 'src/modules/phones/phone.entity';

@Entity()
export class Client extends Person {
  // owns property

  @OneToMany(() => Phone, (phone) => phone.client, { cascade: true })
  phones: Phone[];
}
