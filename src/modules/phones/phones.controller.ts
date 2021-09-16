import { Controller, Body, Patch, Param, Get } from '@nestjs/common';

import { PhonesService } from './phones.service';
import { UpdatePhoneDto } from './dto/update-phone.dto';

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Get()
  findAll() {
    return this.phonesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto) {
    return this.phonesService.update(+id, updatePhoneDto);
  }
}
