import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [PropertiesModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
