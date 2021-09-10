import { Injectable } from '@nestjs/common';
import { networkInterfaces } from 'os';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  private properties: Property[] = [
    {
      id: 1,
      name: 'FulanoTeste',
      city: 'Brasília',
      state: 'Distrito Federal',
      district: 'Asa Norte',
      street: 'SQN 116',
      number: 304,
      zipNumber: '78903000',
      type: 'Apartamento',
      size: '63',
      numberBedroom: 3,
      numberBath: 2,
      numberPark: 1,
      status: 'Aluguel',
      value: 1500.0,
      viewed: 132,
      idOwner: 1111,
      idRealtor: 22,
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 2,
      name: 'deTal',
      city: 'Brasília',
      state: 'Distrito Federal',
      district: 'Asa Norte',
      street: 'SQN 116',
      number: 304,
      zipNumber: '78903000',
      type: 'Apartamento',
      size: '63',
      numberBedroom: 3,
      numberBath: 2,
      numberPark: 1,
      status: 'Aluguel',
      value: 1500.0,
      viewed: 132,
      idOwner: 1111,
      idRealtor: 22,
      createdAt: null,
      updatedAt: null,
    },
  ];

  create(createPropertyDto: CreatePropertyDto): Property {
    const newProperty = {
      id: Date.now(),
      ...createPropertyDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.properties.push(newProperty);

    return newProperty;
  }

  findAll(): Property[] {
    return this.properties;
  }

  findOne(id: number): Property {
    const queryProperty = this.properties.find(
      (property) => property.id === id,
    );

    return queryProperty;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const property = this.findOne(id);

    if (!property) {
      return null;
    }

    for (const key in property) {
      if (updatePropertyDto[key]) property[key] = updatePropertyDto[key];
    }

    return property;
  }

  remove(id: number) {
    const index = this.properties.findIndex((value) => value.id === id);

    this.properties.splice(index, 1);

    return { status: 201, message: 'User Deleted' };
  }
}
