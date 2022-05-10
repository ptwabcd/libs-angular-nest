import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Pipe({
  name: 'serverPath'
})
export class ServerPathPipe implements PipeTransform {

  constructor(
    private configService: ConfigService
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
