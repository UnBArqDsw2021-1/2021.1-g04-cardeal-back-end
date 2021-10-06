import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(data: CreateScheduleDto) {
    const schedule = this.scheduleRepository.create(data);
    await this.scheduleRepository.save(data);

    return schedule;
  }

  findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async findOne(id: number): Promise<Schedule | null> {
    try {
      const schedule = await this.scheduleRepository.findOneOrFail(id);
      return schedule;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async update(id: number, data: Partial<UpdateScheduleDto>) {
    const schedule = await this.findOne(id);

    //await this.scheduleRepository.update({ id }, data);

    schedule.dateMeeting = data.dateMeeting;
    schedule.idClient = data.idClient;
    schedule.idProperty = data.idProperty;

    this.scheduleRepository.save(schedule);

    return schedule;
  }

  async remove(id: number): Promise<Schedule> {
    const schedule = await this.findOne(id);

    return this.scheduleRepository.remove(schedule);
  }
}
