import { Injectable, NotFoundException } from '@nestjs/common';
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
    const owner = this.ownerRepository.create(data);
    await this.ownerRepository.save(data);

    return owner;
  }

  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find({ relations: ['phones'] });
  }

  async findOne(id: number): Promise<Owner> {
    try {
      const owner = await this.ownerRepository.findOneOrFail(+id, {
        relations: ['phones'],
      });
      return owner;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async update(id: number, data: Partial<UpdateOwnerDto>) {
    const owner = await this.findOne(id);

    //await this.ownersRepository.update({ id }, data);

    owner.name = data.name;
    owner.cpf = data.cpf;
    owner.email = data.email;

    this.ownerRepository.save(owner);

    return owner;
  }

  async remove(id: number): Promise<Owner> {
    const owner = await this.findOne(id);

    return this.ownerRepository.remove(owner);
  }
}
