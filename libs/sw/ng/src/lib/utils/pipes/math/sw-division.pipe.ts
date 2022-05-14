import { Pipe, PipeTransform } from '@angular/core';
import { NumberPrototype } from 'sw-common';

@Pipe({
  name: 'swDivision'
})
export class SwDivisionPipe implements PipeTransform {

  transform(arg1, arg2): number {
    return NumberPrototype.division(arg1, arg2);
  }

}
