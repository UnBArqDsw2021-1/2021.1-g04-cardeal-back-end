import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { RealtorsService } from './realtors.service';
import { CreateRealtorDto } from './dto/create-realtor.dto';
import { UpdateRealtorDto } from './dto/update-realtor.dto';
import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';


@Controller('realtors')
export class RealtorsController {
  constructor(private readonly realtorsService: RealtorsService, private authService: AuthService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createRealtorDto: CreateRealtorDto) {
    return this.realtorsService.create(createRealtorDto);
  }

  @Post("/login")
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  // @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.realtorsService.findAll();
  }
  
  // @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realtorsService.findOne(+id);
  }
  
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRealtorDto: UpdateRealtorDto,
  ) {
    return this.realtorsService.update(+id, updateRealtorDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realtorsService.remove(+id);
  }

}
