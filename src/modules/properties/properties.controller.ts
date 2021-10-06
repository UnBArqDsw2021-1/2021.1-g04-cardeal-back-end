import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { type } from 'os';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findByQuery(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Property[]> {
    return this.propertiesService.findByQuery(limit, page);
  }

  @Get('type')
  findByType(
    @Query('tipoAtributo') tipoAtributo: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Property[]> {
    return this.propertiesService.findByType(tipoAtributo, limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Property> {
    const property = this.propertiesService.findOne(+id);

    if (!property) {
      throw new NotFoundException();
    }

    return property;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = this.propertiesService.update(+id, updatePropertyDto);

    if (!property) {
      throw new NotFoundException();
    }

    return property;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Property> {
    return this.propertiesService.remove(+id);
  }
}
