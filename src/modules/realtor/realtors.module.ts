import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RealtorsService } from './realtors.service';
import { RealtorsController } from './realtors.controller';
import { Realtor } from './entities/realtor.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Realtor])],
  controllers: [RealtorsController],
  providers: [RealtorsService],
})
export class RealtorsModule {}
