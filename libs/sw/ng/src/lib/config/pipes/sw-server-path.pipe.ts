import { Pipe, PipeTransform } from '@angular/core';
import { SwConfigService } from '../services';

@Pipe({
  name: 'serverPath'
})
export class SwServerPathPipe implements PipeTransform {

  constructor(
    private configService: SwConfigService
  ) {
  }

  transform(value: string): string {
    if (value) {
      if (value.substring(0, 7) === 'http://' || value.substring(0, 8) === 'https://') {
        return value;
      } else {
        return `${this.configService.getConfig('SERVER')}/${value}`;
      }
    } else {
      return value;
    }
  }

}
