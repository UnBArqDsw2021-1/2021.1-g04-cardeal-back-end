import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRealtorDto } from './dto/create-realtor.dto';
import { UpdateRealtorDto } from './dto/update-realtor.dto';
import { Realtor } from './entities/realtor.entity';

@Injectable()
export class RealtorsService {
  constructor(
    @InjectRepository(Realtor)
    private realtorsRepository: Repository<Realtor>,
  ) {}

  async create(data: CreateRealtorDto) {
    const realtor = this.realtorsRepository.create(data);
    await this.realtorsRepository.save(data);

    return realtor;
  }

  findAll(): Promise<Realtor[]> {
    return this.realtorsRepository.find({ relations: ['phones'] });
  }

  findOne(id: number): Promise<Realtor> {
    const realtor = this.realtorsRepository.findOne(+id, {
      relations: ['phones'],
    });

    return realtor;
  }

  async update(id: number, data: Partial<UpdateRealtorDto>) {
    await this.realtorsRepository.update({ id }, data);

    const realtor = await this.realtorsRepository.findOne(
      { id },
      { relations: ['phones'] },
    );

    return realtor;
  }

  async remove(id: number): Promise<void> {
    await this.realtorsRepository.delete(+id);
  }
}
