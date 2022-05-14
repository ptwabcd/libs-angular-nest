import { Pipe, PipeTransform } from '@angular/core';
import { NumberPrototype } from 'sw-common';

@Pipe({
  name: 'swSubtraction'
})
export class SwSubtractionPipe implements PipeTransform {

  transform(arg1, arg2): number {
    return NumberPrototype.subtraction(arg1, arg2);
  }

}
