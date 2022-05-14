import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SwFileSize'
})
export class SwFileSizePipe implements PipeTransform {

  transform(value: any): any {
    const unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const level = Math.floor(Math.log(value) / Math.log(1024));
    return value === 0 ? 0 : (value / Math.pow(1024, Math.floor(level))).toFixed(0) + unit[level];
  }

}
