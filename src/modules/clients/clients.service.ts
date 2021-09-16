import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async create(data: CreateClientDto) {
    const client = this.clientsRepository.create(data);
    await this.clientsRepository.save(data);

    return client;
  }

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find({ relations: ['phones'] });
  }

  findOne(id: number): Promise<Client> {
    const client = this.clientsRepository.findOne(+id, {
      relations: ['phones'],
    });

    return client;
  }

  async update(id: number, data: Partial<UpdateClientDto>) {
    console.log(data);

    await this.clientsRepository.update({ id }, data);
    return await this.clientsRepository.findOne(
      { id },
      { relations: ['phones'] },
    );
  }

  async remove(id: number): Promise<void> {
    await this.clientsRepository.delete(+id);
  }
}
