import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustResourceUrl'
})
export class SwTrustResourceUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): any {
    let result;
    if (value) {
      result = this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }

    return result ? result : value;
  }

}
