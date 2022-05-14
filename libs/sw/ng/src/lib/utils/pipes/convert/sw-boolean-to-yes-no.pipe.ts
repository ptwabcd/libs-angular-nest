import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'swBooleanToYesNo'
})
export class SwBooleanToYesNoPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) {

  }

  transform(value: boolean): any {
    return this.translateService.instant(value ? 'YES' : 'NO');
  }

}
