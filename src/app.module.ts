import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './modules/properties/properties.module';
import { ClientsModule } from './modules/clients/clients.module';
import { PhonesModule } from './modules/phones/phones.module';
import { RealtorsModule } from './modules/realtor/realtors.module';
import { OwnersModule } from './modules/owner/owner.module';

@Module({
  imports: [
    PropertiesModule,
    ClientsModule,
    RealtorsModule,
    OwnersModule,
    PhonesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
