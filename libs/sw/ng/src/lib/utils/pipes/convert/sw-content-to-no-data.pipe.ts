import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'swContentToNoData'
})
export class SwContentToNoDataPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) {

  }

  transform(value: string | number): any {
    return value ? value : this.translateService.instant('NO_DATA');
  }

}
