import { Pipe, PipeTransform } from '@angular/core';
import { NumberPrototype } from 'sw-common';

@Pipe({
  name: 'ssAddition'
})
export class SwAdditionPipe implements PipeTransform {

  transform(arg1, arg2): number {
    return NumberPrototype.addition(arg1, arg2);
  }

}
