import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { networkInterfaces } from 'os';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const newProperty = {
      ...createPropertyDto,
    };

    const again = this.propertyRepository.create(newProperty);

    return this.propertyRepository.save(again);
  }

  findOne(id: number): Promise<Property> {
    const queryProperty = this.propertyRepository.findOne(id);

    return queryProperty;
  }

  findByQuery(limit, page): Promise<Property[]> {
    const take = limit || 50;
    const skip = page * limit || 0;

    const queryResult = this.propertyRepository.find({
      take: take,
      skip: skip,
    });

    return queryResult;
  }

  findByType(tipoAtributo, limit, page): Promise<Property[]> {
    const take = limit || 50;
    const skip = page * limit || 0;
    const wow = tipoAtributo;

    const queryResult = this.propertyRepository.find({
      where: { type: wow },
      take: take,
      skip: skip,
      order: { viewed: 'DESC' },
    });

    return queryResult;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = await this.findOne(id);

    if (!property) {
      return null;
    }

    for (const key in property) {
      if (updatePropertyDto[key]) property[key] = updatePropertyDto[key];
    }

    this.propertyRepository.save(property);

    return property;
  }

  async remove(id: number) {
    const removedProperty = await this.findOne(id);

    return this.propertyRepository.remove(removedProperty);
  }
}
