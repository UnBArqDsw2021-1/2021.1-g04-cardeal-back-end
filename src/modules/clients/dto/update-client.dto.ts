import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
}
