import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { RealtorsService } from './realtors.service';
import { CreateRealtorDto } from './dto/create-realtor.dto';
import { UpdateRealtorDto } from './dto/update-realtor.dto';

@Controller('realtors')
export class RealtorsController {
  constructor(private readonly realtorsService: RealtorsService) {}

  @Post()
  create(@Body() createRealtorDto: CreateRealtorDto) {
    return this.realtorsService.create(createRealtorDto);
  }

  @Get()
  findAll() {
    return this.realtorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realtorsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRealtorDto: UpdateRealtorDto,
  ) {
    return this.realtorsService.update(+id, updateRealtorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realtorsService.remove(+id);
  }
}
