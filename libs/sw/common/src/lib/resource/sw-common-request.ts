import { SwDateRequestInterface, SwFilterRequestInterface, SwPaginationRequestInterface } from './interface';
import { SwPaginationRequest } from './sw-pagination-request';
import { SwCovert } from '../covert';

export class SwCommonRequest extends SwPaginationRequest {
  startDate: Date;
  endDate: Date;
  keyword: string;

  constructor(data: SwDateRequestInterface & SwFilterRequestInterface & SwPaginationRequestInterface) {
    super(data);
    this.startDate = new SwCovert(data.startDate).toDate();
    this.endDate = new SwCovert(data.endDate).toDate();
    this.keyword = new SwCovert(data.keyword).toValue('');
  }
}
