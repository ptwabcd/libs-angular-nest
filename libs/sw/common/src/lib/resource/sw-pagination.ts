import { SwPaginationRequest } from './sw-pagination-request';

export class SwPagination extends SwPaginationRequest {
  total: number;

  constructor(data: SwPaginationRequest, total: number) {
    super(data);
    this.total = total;
  }
}
