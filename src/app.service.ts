import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {"app":"Cardeal","status":"Up"};
  }
}
