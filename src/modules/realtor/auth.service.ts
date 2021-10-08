import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
  } from '@nestjs/common'
  
  import { JwtService } from '@nestjs/jwt'
  import { HashService } from './hash.service'
  import { RealtorsService } from "./realtors.service"
  
  
  @Injectable()
  export class AuthService {
    @Inject(JwtService) private jwtService: JwtService
    @Inject(HashService) private hashService: HashService
    @Inject(RealtorsService) private realtorsService: RealtorsService
  
    async generateToken(expiresIn: number, data: any) {
      return this.jwtService.signAsync({...data}, {
        expiresIn,
      })
    }
  
    async verifyToken(token: string) {
      if (!token) {
        throw new BadRequestException('INVALID_TOKEN')
      }
  
      const split = token.split('Bearer ')[1]
  
      if (split) token = split
  
      return this.jwtService.verifyAsync(token)
    }
  
    async decodeToken(token: string) {
      const split = token.split('Bearer ')[1]
  
      if (split) token = split
  
      const payload = this.jwtService.decode(token)
  
      if (typeof payload === 'string' || !payload) {
        throw new BadRequestException('INVALID_TOKEN')
      }
  
      return payload
    }
  
  
    async login({ email, password }) {
      email = email.trim()
  
      const user = await this.realtorsService.findOneByEmail(email)
  
      if (!(await this.hashService.compareHash(password, user.password))) {
        throw new NotFoundException('USER_NOT_FOUND')
      }
  
      return {
        accessToken: await this.generateToken(
          10800 * 108000,
          user,
        ),
      }
    }
  
}