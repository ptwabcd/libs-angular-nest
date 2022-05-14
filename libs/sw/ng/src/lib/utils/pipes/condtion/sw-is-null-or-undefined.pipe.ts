import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swINullOrUndefined'
})
export class SwIsNullOrUndefinedPipe implements PipeTransform {

  transform(value: any): any {
    return value === null || value === undefined;
  }

}
