import { Pipe, PipeTransform } from '@angular/core';
import { SwCreateArrayType } from 'sw-common';

@Pipe({
  name: 'swCreateArray'
})
export class SwCreateArrayPipe implements PipeTransform {

  transform(type: SwCreateArrayType = SwCreateArrayType.NUMBER, startValue = 0, endValue?: number, step = 1): Array<number> | Array<string> {
    const counts = [];
    switch (type) {
      case SwCreateArrayType.NUMBER:
        for (let i = startValue; i <= endValue; i += step) {
          counts.push(i);
        }
        break;
      case SwCreateArrayType.EN:
        for (let i = startValue; i <= endValue; i++) {
          counts.push((type === SwCreateArrayType.EN) ? String.fromCharCode( 65 + i ) : i);
        }
        break;
      case SwCreateArrayType.HOUR:
        for (let i = startValue; i < 24; i++) {
          counts.push((i > 9) ? i.toString() : `0${i}`);
        }
        break;
      case SwCreateArrayType.MINUTE:
        for (let i = startValue; i < 60; i++) {
          counts.push((i > 9) ? i.toString() : `0${i}`);
        }
        break;
    }

    return counts;
  }

}
