import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustStyle'
})
export class SwTrustStylePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }

}
