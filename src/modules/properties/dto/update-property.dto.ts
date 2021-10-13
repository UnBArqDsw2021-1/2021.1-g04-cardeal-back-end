import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  name?: string;
  city?: string;
  state?: string;
  district?: string;
  street?: string;
  number?: number;
  zipNumber?: string;
  type?: string;
  size?: string;
  numberBedroom?: number;
  numberBath?: number;
  numberPark?: number;
  status?: string;
  value?: number;
  viewed?: number;
  idOwner?: number;
  idRealtor?: number;
  updatedAt: number;
  image: string;
}
