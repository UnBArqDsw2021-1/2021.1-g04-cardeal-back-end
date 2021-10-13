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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PropertiesService } from '../service/properties.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { Property } from '../entities/property.entity';
import { type } from 'os';
import {FilesInterceptor } from '@nestjs/platform-express';
import  MulterGoogleStorage  from 'multer-google-storage';
import * as path from 'path';
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file', null, {
    storage: new MulterGoogleStorage({
      projectId: 'wise-mantra-325305',
      keyFilename: './service-account.json',
      bucket: "cardeal-upload",
      contentType: (req, file)=>{
        return "image/jpeg";
      }
        ,
      filename: (req, file, cb) => {
        const fileNameSplit = file.originalname.split('.');
        const fileExt = fileNameSplit.pop();
        cb(null, `${Date.now()}.${fileExt}`);
      }
    })
  }))
  async create(@UploadedFiles() file,@Body() createPropertyDto: CreatePropertyDto) {
    if (file.length === 0){
      return {error:"The filed file doesn`t exist, please check the field and try again"}
    }
    let bucketUrl = file[0].path
    createPropertyDto.image = bucketUrl
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

  @Get('status')
  findByStatus(
    @Query('tipoAtributo') tipoAtributo: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Property[]> {
    return this.propertiesService.findByStatus(tipoAtributo, limit, page);
  }

  @Get('district')
  findByDistrict(
    @Query('tipoAtributo') tipoAtributo: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Property[]> {
    return this.propertiesService.findByDistrict(tipoAtributo, limit, page);
  }

  @Get('idRealtor')
  findByRealtor(
    @Query('tipoAtributo') tipoAtributo: number,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Property[]> {
    return this.propertiesService.findByRealtor(tipoAtributo, limit, page);
  }

  @Get('search')
  findBySearch(
    @Query('status') status: string,
    @Query('city') city: string,
    @Query('district') district: string,
    @Query('lowprice') lowprice: number,
    @Query('highprice') highprice: number,
    @Query('baths') baths: number,
    @Query('rooms') rooms: number,
    @Query('m2') m2: number,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Property[]> {
    return this.propertiesService.findBySearch(
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
    );
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
