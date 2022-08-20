import { SwFilterRequestInterface, SwPaginationRequestInterface } from './interface';
import { SwPaginationRequest } from './sw-pagination-request';
import { SwCovert } from '../covert';

export class SwFilterRequest extends SwPaginationRequest {
  keyword?: string;

  constructor(data: SwFilterRequestInterface & SwPaginationRequestInterface) {
    super(data);
    this.keyword = new SwCovert(data.keyword).toValue('');
  }
}
