import { Pipe, PipeTransform } from '@angular/core';
import { SwStr2Obj } from 'sw-common';

@Pipe({
  name: 'swStr2Obj'
})
export class SwStr2ObjPipe implements PipeTransform {

  transform(obj: object, str?: string, split: string = '.'): any {
    return new SwStr2Obj().transform(obj, str, split);
  }
}
