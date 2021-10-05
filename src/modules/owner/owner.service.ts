import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {}

  async create(data: CreateOwnerDto) {
    const client = this.ownerRepository.create(data);
    await this.ownerRepository.save(data);

    return client;
  }

  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find({ relations: ['phones'] });
  }

  findOne(id: number): Promise<Owner> {
    const client = this.ownerRepository.findOne(+id, {
      relations: ['phones'],
    });

    return client;
  }

  async update(id: number, data: Partial<UpdateOwnerDto>) {
    await this.ownerRepository.update({ id }, data);

    const client = await this.ownerRepository.findOne(
      { id },
      { relations: ['phones'] },
    );

    return client;
  }

  async remove(id: number): Promise<void> {
    await this.ownerRepository.delete(+id);
  }
}
