import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swShorthand'
})
export class SwShorthandPipe implements PipeTransform {

  transform(value: string): string {
    const pattern = /^[A-Za-z0-9_-]+$/;
    return (value)
      ? (pattern.test(value))
        ? value[0]
        : value.slice(-2)
      : '';
  }

}
