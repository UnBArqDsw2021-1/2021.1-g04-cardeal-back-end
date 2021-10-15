import { Module } from '@nestjs/common';
import { PropertiesService } from './service/properties.service';
import { PropertiesController } from './controller/properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Property])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
