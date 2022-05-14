import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swToNumber'
})
export class SwToNumberPipe implements PipeTransform {
  transform(value) {
    const retNumber = Number(value);
    return isNaN(retNumber) ? 0 : retNumber;
  }
}
