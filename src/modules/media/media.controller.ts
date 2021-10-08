import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMediaDto } from './dto/create-media.dto';
import { Media } from './entities/media.entity';

import { MediaService } from './media.service';
// import { CreateMediaDto } from './dto/create-media.dto';
// import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('media'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateMediaDto,
  ) {
    return await this.mediaService.create({
      ...data,
      originalname: file?.originalname,
      filename: `${file?.filename}.${file?.mimetype.substring(6)}`,
      url: `${file?.path}.${file?.mimetype.substring(6)}`,
    });
  }

  @Get()
  findAll(): Promise<Media[]> {
    return this.mediaService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Media> {
    return this.mediaService.remove(+id);
  }
}
