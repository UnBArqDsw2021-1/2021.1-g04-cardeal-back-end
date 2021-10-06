import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchedulesService } from './schedule.service';
import { SchedulesController } from './schedule.controller';
import { Schedule } from './entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
