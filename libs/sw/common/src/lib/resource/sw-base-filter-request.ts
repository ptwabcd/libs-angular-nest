import { SwFilterRequestInterface } from './interface';
import { SwCovert } from '../covert';

export class SwBaseFilterRequest {
  keyword: string;

  constructor(data: SwFilterRequestInterface) {
    this.keyword = new SwCovert(data.keyword).toValue();
  }
}
