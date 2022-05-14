import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swTreeToList'
})
export class SwTreeToListPipe implements PipeTransform {

  transform<T>(root: Array<any>, childrenKey: string): Array<T> {
    return root.reduce( (r, a) => {
      r.push(a);
      if (a[childrenKey] && Array.isArray(a[childrenKey])) {
        r = r.concat(this.transform(a[childrenKey], childrenKey));
      }
      return r;
    }, []);
  }

}
