import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll(): Promise<Property[]> {
    return this.propertiesService.findAll();
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
