import { Column, Entity, OneToMany } from 'typeorm';
import { Person } from '../../person/person.entity';
import { Phone } from 'src/modules/phones/entities/phone.entity';

@Entity()
export class Realtor extends Person {
  @Column()
  passwordHash: string;

  @OneToMany(() => Phone, (phone) => phone.realtor, { cascade: true })
  phones: Phone[];
}
