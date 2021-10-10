import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { Property } from '../entities/property.entity';

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

  async findOne(id: number): Promise<Property> {
    try {
      const property = await this.propertyRepository.findOneOrFail(id);
      return property;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  findByQuery(limit: number, page: number): Promise<Property[]> {
    const take = limit || 50;
    const skip = page * limit || 0;

    const queryResult = this.propertyRepository.find({
      take: take,
      skip: skip,
    });

    return queryResult;
  }

  findByType(
    tipoAtributo: string,
    limit: number,
    page: number,
  ): Promise<Property[]> {
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

  findByStatus(
    tipoAtributo: string,
    limit: number,
    page: number,
  ): Promise<Property[]> {
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

  findByDistrict(
    tipoAtributo: string,
    limit: number,
    page: number,
  ): Promise<Property[]> {
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

  findByRealtor(
    tipoAtributo: number,
    limit: number,
    page: number,
  ): Promise<Property[]> {
    const take = limit || 50;
    const skip = page * limit || 0;

    const queryResult = this.propertyRepository.find({
      where: { idRealtor: tipoAtributo },
      take: take,
      skip: skip,
      order: { viewed: 'ASC' },
    });

    return queryResult;
  }

  findBySearch(
    status: string,
    city: string,
    district: string,
    lowprice: number,
    highprice: number,
    baths: number,
    rooms: number,
    m2: number,
    limit: number,
    page: number,
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

    for (const key in property) {
      if (updatePropertyDto[key]) property[key] = updatePropertyDto[key];
    }

    this.propertyRepository.save(property);

    return property;
  }

  async remove(id: number): Promise<Property> {
    const removedProperty = await this.findOne(id);

    return this.propertyRepository.remove(removedProperty);
  }
}
