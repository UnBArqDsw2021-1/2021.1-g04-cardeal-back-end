import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(Phone)
    private phonesRepository: Repository<Phone>,
  ) {}

  findAll(): Promise<Phone[]> {
    return this.phonesRepository.find();
  }

  async update(id: number, data: Partial<UpdatePhoneDto>) {
    const phone = await this.phonesRepository.findOne(id);

    if (!phone) {
      return null;
    }

    for (const key in phone) {
      if (data[key]) phone[key] = data[key];
    }

    this.phonesRepository.save(phone);

    return phone;
    //  return await this.phonesRepository.update({ id }, data);
  }
}
