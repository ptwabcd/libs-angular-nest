import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swListToTree'
})
export class SwListToTreePipe implements PipeTransform {

  transform<T>(items: Array<T>, idKey: string, parentKey: string, childrenKey: string): Array<T> {
    const treeList = [];
    const map = {};
    items.forEach(item => {
      map[item[idKey]] = item;
      item[childrenKey] = [];
    });
    items.forEach(item => {
      if (item[parentKey] !== null) {
        map[item[parentKey]][childrenKey].push(item);
      } else {
        treeList.push(item);
      }
    });
    return treeList;
  }

}
