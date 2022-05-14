import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwGender } from 'sw-common';

@Pipe({
  name: 'swGender'
})
export class SwGenderPipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {}

  transform(value: SwGender): any {
    return this.translate.instant(value === SwGender.MALE ? 'MALE' : 'FEMALE');
  }

}
