import { SwPaginationRequest } from './sw-pagination-request';
import { SwDateRequestInterface, SwPaginationRequestInterface } from './interface';
import { SwCovert } from '../covert';

export class SwDateRequest extends SwPaginationRequest {
  startDate: Date;
  endDate: Date;

  constructor(data: SwDateRequestInterface & SwPaginationRequestInterface) {
    super(data);
    this.startDate = new SwCovert(data.startDate).toDate();
    this.endDate = new SwCovert(data.endDate).toDate();
  }
}
