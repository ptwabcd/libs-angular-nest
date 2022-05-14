import { Pipe, PipeTransform } from '@angular/core';
import { NumberPrototype } from 'sw-common';

@Pipe({
  name: 'swMultiplication'
})
export class SwMultiplicationPipe implements PipeTransform {

  transform(arg1, arg2): number {
    return NumberPrototype.multiplication(arg1, arg2);
  }

}
