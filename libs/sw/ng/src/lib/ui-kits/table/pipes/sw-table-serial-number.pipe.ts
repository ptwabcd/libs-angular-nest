import { Pipe, PipeTransform } from '@angular/core';
import { SwPagination } from 'sw-common';

@Pipe({
  name: 'swTableSerialNumber'
})
export class SwTableSerialNumberPipe implements PipeTransform {

  transform(index: any, pagination?: SwPagination): number {
    const currentIndex = index + 1;
    return (pagination) ? ( ( (pagination.currentPage - 1) * pagination.perPage ) + currentIndex ) : currentIndex;
  }

}
