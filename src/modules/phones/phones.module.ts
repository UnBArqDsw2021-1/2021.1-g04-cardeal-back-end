import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhonesController } from './phones.controller';
import { PhonesService } from './phones.service';
import { Phone } from './entities/phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  controllers: [PhonesController],
  providers: [PhonesService],
})
export class PhonesModule {}
