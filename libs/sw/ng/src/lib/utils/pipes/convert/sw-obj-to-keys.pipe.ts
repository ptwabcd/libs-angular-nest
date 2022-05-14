import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swObjToKeys'
})
export class SwObjToKeysPipe implements PipeTransform {

  transform(obj: Object): Array<string> {
    return obj ? Object.keys(obj) : [];
  }

}
