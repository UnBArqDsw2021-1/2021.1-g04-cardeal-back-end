import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RealtorsService } from './realtors.service';
import { RealtorsController } from './realtors.controller';
import { Realtor } from './entities/realtor.entity';
import { HashService } from './hash.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forRoot(),PassportModule.register({defaultStrategy:"jwt",jwt:{secret: "cardeal",signOptions:{
    expiresIn:18000
  }}}),
  TypeOrmModule.forFeature([Realtor]),JwtModule.register({secret: "cardeal",signOptions:{
    expiresIn:18000
  }})],
  controllers: [RealtorsController],
  providers: [RealtorsService,HashService,AuthService,JwtStrategy],
})
export class RealtorsModule {}
