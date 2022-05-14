import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swIsArraySame'
})
export class SwIsArraySamePipe implements PipeTransform {

  /**
   * @example
   * const arr1 = [{a: '123', b: [3,2,1]}, 1, 'a', 2, 3, '我', 4, 5];
   * const arr2 = [1, 2, 3, 5, {a: '123', b: [3,2,1]}, 4, 'a', '我'];
   * this.isArraySamePipe.translate(arr1, arr2); // true
   * -----------------------------------------------------------------
   * const arr1 = [{a: '123', b: [3,2,1]}, 1, 'a', 2, 3, '我', 4, 5];
   * const arr2 = [1, 2, 3, 5, {a: '123', b: [1,2,3]}, 4, 'a', '我'];
   * this.isArraySamePipe.translate(arr1, arr2); // false
   * @param arr1
   * @param arr2
   * @param splitMark
   */
  transform(arr1: Array<any> | string, arr2: Array<any> | string, splitMark = ','): any {
    if (typeof arr1 === 'string') {
      arr1 = arr1.split(splitMark);
    }
    if (typeof arr2 === 'string') {
      arr2 = arr2.split(splitMark);
    }
    return JSON.stringify((arr1) ? arr1.sort() : []) === JSON.stringify((arr2) ? arr2.sort() : []);
  }

}
