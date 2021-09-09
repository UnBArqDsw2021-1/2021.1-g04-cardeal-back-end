import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PropertiesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
