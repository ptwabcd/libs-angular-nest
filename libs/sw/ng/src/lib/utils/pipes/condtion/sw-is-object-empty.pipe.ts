import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swIsObjectEmpty'
})
export class SwIsObjectEmptyPipe implements PipeTransform {

  transform(value: Object, args?: any): boolean {
    return Object.keys(value).length === 0;
  }

}
