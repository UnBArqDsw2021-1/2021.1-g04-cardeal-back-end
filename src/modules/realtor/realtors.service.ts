import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number): Promise<Realtor> {
    try {
      const realtor = await this.realtorsRepository.findOneOrFail(id);
      return realtor;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async update(id: number, data: Partial<UpdateRealtorDto>) {
    const realtor = await this.findOne(id);

    realtor.name = data.name;
    realtor.cpf = data.cpf;
    realtor.email = data.email;
    realtor.passwordHash = data.passwordHash;

    this.realtorsRepository.save(realtor);

    return realtor;
  }

  async remove(id: number): Promise<Realtor> {
    const realtor = await this.findOne(id);

    return this.realtorsRepository.remove(realtor);
  }
}
