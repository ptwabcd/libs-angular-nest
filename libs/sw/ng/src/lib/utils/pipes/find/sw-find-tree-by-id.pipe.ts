import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swFindTreeById'
})
export class SwFindTreeByIdPipe implements PipeTransform {

  transform<T = any>(tree: Array<T>, id: number, idKey: string = 'id', childrenKey: string = 'children') {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i][idKey] === id) {
          return tree[i];
      }
      const result = this.transform(tree[i][childrenKey], id);
      if (result) {
        return result;
      }
    }
  }
}
