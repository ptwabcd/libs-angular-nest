import { SwFilterRequestInterface, SwPaginationRequestInterface } from './interface';
import { SwPaginationRequest } from './sw-pagination-request';
import { SwBaseFilterRequest } from './sw-base-filter-request';

export class SwFilterRequest extends SwPaginationRequest {
  keyword?: string;

  constructor(data: SwFilterRequestInterface & SwPaginationRequestInterface) {
    super(data);
    new SwBaseFilterRequest(data);
  }
}
