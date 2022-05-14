import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlEscape'
})
export class SwHtmlEscapePipe implements PipeTransform {

  transform(value: any): string {
    return (value) ? decodeURIComponent(escape(unescape(encodeURIComponent(value.toString())))) : '';
  }
}
