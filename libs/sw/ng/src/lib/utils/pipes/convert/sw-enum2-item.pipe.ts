import { Pipe, PipeTransform } from '@angular/core';
import { SwItem } from 'sw-common';

@Pipe({
  name: 'SwEnum2Item'
})
export class SwEnum2ItemPipe implements PipeTransform {

  transform(value: any, excludeKeys: Array<string> = [], isGetTitle: boolean = true): Array<any> {
    return Object
      .keys(value)
      .filter(key => isNaN(Number(key)) && !excludeKeys.includes(key)) // 過濾key為數字的物件
      .map(key => (isGetTitle) ? new SwItem({ title: key, value: value[key] }) : value[key]);
  }

}
