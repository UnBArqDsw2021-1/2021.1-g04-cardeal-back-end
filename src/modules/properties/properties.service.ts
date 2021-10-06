import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { networkInterfaces } from 'os';
import { Between, In, LessThan, MoreThan, Not, Repository  } from 'typeorm';
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

    const queryResult = this.propertyRepository.find({
      where: { type: tipoAtributo },
      take: take,
      skip: skip,
      order: { viewed: 'DESC' },
    });

    return queryResult;
  }

  findByStatus(tipoAtributo, limit, page): Promise<Property[]> {
    const take = limit || 50;
    const skip = page * limit || 0;

    const queryResult = this.propertyRepository.find({
      where: { status: tipoAtributo },
      take: take,
      skip: skip,
      order: { viewed: 'DESC' },
    });

    return queryResult;
  }

  findByDistrict(tipoAtributo, limit, page): Promise<Property[]> {
    const take = limit || 50;
    const skip = page * limit || 0;

    const queryResult = this.propertyRepository.find({
      where: { district: tipoAtributo },
      take: take,
      skip: skip,
      order: { viewed: 'DESC' },
    });

    return queryResult;
  }

  findBySearch(
    status,
    city,
    district,
    lowprice,
    highprice,
    baths,
    rooms,
    m2,
    limit,
    page,
  ): Promise<Property[]> {
    const take = limit || 50;
    const skip = page * limit || 0;
    const negocio = status || 0;
    const cidade = city || 0;
    const bairro = district || 0;
    const banheiros = baths || MoreThan(0);
    const quartos = rooms || MoreThan(0);
    const precoBaixo = lowprice || 0;
    const precoAlto = highprice || 999999999;
    const metro2 = m2 || MoreThan(0);

    const queryResult = this.propertyRepository.find({
      where: {
        city: cidade,
        status: negocio,
        district: bairro,
        numberBath: banheiros,
        numberBedroom: quartos,
        value: Between(precoBaixo, precoAlto),
        size: metro2,
      },
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
