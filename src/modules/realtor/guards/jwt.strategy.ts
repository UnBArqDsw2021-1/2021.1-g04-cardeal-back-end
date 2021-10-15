import { Inject, Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { RealtorsService } from '../realtors.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(RealtorsService) private realtorsService: RealtorsService

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "cardeal"
    })
  }

  async validate(payload: any) {
    return this.realtorsService.findOne(payload.id)
  }
}