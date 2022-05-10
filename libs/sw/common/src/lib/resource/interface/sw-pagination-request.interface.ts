import { SwSortDirection } from '../../table';
export interface SwPaginationRequestInterface {
    currentPage?: number;
    perPage?: number;
    sortKey?: string;
    sortDirection?: SwSortDirection;
}
