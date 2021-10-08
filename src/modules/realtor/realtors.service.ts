import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRealtorDto } from './dto/create-realtor.dto';
import { UpdateRealtorDto } from './dto/update-realtor.dto';
import { Realtor } from './entities/realtor.entity';
import { HashService } from './hash.service';

@Injectable()
export class RealtorsService {
  constructor(
    @InjectRepository(Realtor)
    private realtorsRepository: Repository<Realtor>,
    private hashService: HashService
  ) {}

  async create(data: CreateRealtorDto) {
    data.email = data.email.trim()
  
    data.password = await this.hashService.generateHash(data.password)
    const realtor = this.realtorsRepository.create(data);
    await this.realtorsRepository.save(data);

    return realtor;
  }

  async findAll(): Promise<Realtor[]> {
    return this.realtorsRepository.find();
  }

  async findOne(id: number): Promise<Realtor> {
    try {
      const realtor = await this.realtorsRepository.findOneOrFail(id);
      return realtor;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findOneByEmail(email: string): Promise<Realtor> {
    try {
      const realtor = await this.realtorsRepository.findOneOrFail({where:{email}});
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
    realtor.password = data.password;
    realtor.phone = data.phone;

    this.realtorsRepository.save(realtor);

    return realtor;
  }

  async remove(id: number): Promise<Realtor> {
    const realtor = await this.findOne(id);

    return this.realtorsRepository.remove(realtor);
  }
}
