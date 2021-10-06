import { PartialType } from '@nestjs/mapped-types';
import { CreateRealtorDto } from './create-realtor.dto';

export class UpdateRealtorDto extends PartialType(CreateRealtorDto) {
  name?: string;
  cpf?: string;
  email?: string;
  passwordHash?: string;
  phone?: string;
}
