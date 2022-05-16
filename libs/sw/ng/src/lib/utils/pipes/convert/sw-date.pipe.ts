import { Pipe, PipeTransform } from '@angular/core';
import { SwDate } from 'sw-common';

@Pipe({
  name: 'swDate'
})
export class SwDatePipe implements PipeTransform {

  constructor() {}

  transform(date: string | Date, isDateTime = false, isTaiwanYear = false, isChineseFormat = false): any {
    if (date && new SwDate().isValid(date)) {
      return new SwDate().getDate(isDateTime, date, isTaiwanYear, isChineseFormat);
    } else {
      return date;
    }
  }

}
