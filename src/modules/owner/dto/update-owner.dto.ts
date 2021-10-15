import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnerDto } from './create-owner.dto';

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
}
