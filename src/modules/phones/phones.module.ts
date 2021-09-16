import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
})
export class PhonesModule {}
