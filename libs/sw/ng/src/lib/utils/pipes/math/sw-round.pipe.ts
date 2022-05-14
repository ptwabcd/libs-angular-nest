import { Pipe, PipeTransform } from '@angular/core';
import { NumberPrototype } from 'sw-common';

@Pipe({
  name: 'swRound'
})
export class SwRoundPipe implements PipeTransform {

  transform(value: number): any {
    return Math.round(value);
  }

}
