import { SwDateRequestInterface, SwFilterRequestInterface, SwPaginationRequestInterface } from './interface';
import { SwPaginationRequest } from './sw-pagination-request';
import { SwBaseDateRequest } from './sw-base-date-request';
import { SwBaseFilterRequest } from './sw-base-filter-request';

export class SwCommonRequest extends SwPaginationRequest {
  startDate: Date;
  endDate: Date;
  keyword: string;

  constructor(data: SwDateRequestInterface & SwFilterRequestInterface & SwPaginationRequestInterface) {
    super(data);
    new SwBaseDateRequest(data);
    new SwBaseFilterRequest(data);
  }
}
