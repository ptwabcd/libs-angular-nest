import { SwDistrict } from './sw-district';

export interface SwCity {
  value: string;
  districts: Array<SwDistrict>;
}
