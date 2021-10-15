import { Entity, OneToMany } from 'typeorm';
import { Person } from '../../person/person.entity';
import { Phone } from 'src/modules/phones/entities/phone.entity';
import { Property } from 'src/modules/properties/entities/property.entity';

@Entity()
export class Owner extends Person {
  // @OneToMany(() => Phone, (phone) => phone.owner, { cascade: true })
  // phones: Phone[];

  @OneToMany(type => Property, owner => Owner)
  properties: Property[];
}
