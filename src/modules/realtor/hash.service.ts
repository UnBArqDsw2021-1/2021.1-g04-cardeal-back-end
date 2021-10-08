import { hash, compare } from 'bcrypt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HashService {
  async generateHash(payload: string) {
    return hash(payload, 10)
  }

  async compareHash(payload: string, hashed: string) {
    return compare(payload, hashed)
  }
}