import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OwnersService } from './owner.service';
import { OwnersController } from './owner.controller';
import { Owner } from './entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
