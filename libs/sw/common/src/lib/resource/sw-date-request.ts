import { SwPaginationRequest } from './sw-pagination-request';
import { SwBaseDateRequest } from './sw-base-date-request';
import { SwDateRequestInterface, SwPaginationRequestInterface } from './interface';

export class SwDateRequest extends SwPaginationRequest {
  startDate: Date;
  endDate: Date;

  constructor(data: SwDateRequestInterface & SwPaginationRequestInterface) {
    super(data);
    new SwBaseDateRequest(data);
  }
}
