import { SwSortDirection } from '../table';
import { SwPaginationRequestInterface } from './interface';
import { SwCovert } from '../covert';

export class SwPaginationRequest {
  currentPage?: number;
  perPage?: number;
  sortKey?: string;
  sortDirection?: SwSortDirection;

  constructor(data: SwPaginationRequestInterface ) {
    this.currentPage = new SwCovert(data.currentPage).toNumber(1);
    this.perPage = new SwCovert(data.perPage).toNumber(10);
    this.sortKey = data.sortKey;
    this.sortDirection = data.sortDirection;
  }

}
