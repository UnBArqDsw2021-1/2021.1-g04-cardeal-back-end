import { PartialType } from '@nestjs/mapped-types';
import { CreateRealtorDto } from './create-realtor.dto';

export class UpdateRealtorDto extends PartialType(CreateRealtorDto) {
  passwordHash: string;
  phones: [];
}
