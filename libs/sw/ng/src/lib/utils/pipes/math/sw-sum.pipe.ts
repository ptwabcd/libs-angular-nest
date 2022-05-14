import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swSum'
})
export class SwSumPipe implements PipeTransform {

  transform(data: Array<any>, key: string): number {
    return data.reduce((acc, cur) => {
      if (cur[key]) {
        acc += cur[key];
      } else {
        acc += 0;
      }
      return acc;
    }, 0);
  }

}
