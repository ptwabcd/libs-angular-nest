import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swGroupToArray'
})
export class SwGroupToArrayPipe implements PipeTransform {

  transform(value: Array<any>, key): any {
    return Object.keys(value.reduce((r, a) => {
      r[a[key]] = [...r[a[key]] || [], a];
      return r;
    }, {}));
  }

}
