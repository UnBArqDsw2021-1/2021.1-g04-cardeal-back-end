import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number): Promise<Client> {
    try {
      const client = await this.clientsRepository.findOneOrFail(+id, {
        relations: ['phones'],
      });
      return client;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async update(id: number, data: Partial<UpdateClientDto>) {
    const client = await this.findOne(id);

    //await this.clientsRepository.update({ id }, data);

    client.name = data.name;
    client.cpf = data.cpf;
    client.email = data.email;

    this.clientsRepository.save(client);

    return client;
  }

  async remove(id: number): Promise<Client> {
    const client = await this.findOne(id);

    return await this.clientsRepository.remove(client);
  }
}
