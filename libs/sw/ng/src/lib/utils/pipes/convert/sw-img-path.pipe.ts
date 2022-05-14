import { Pipe, PipeTransform } from '@angular/core';
import { SwServerPathPipe } from '../../../config/pipes';

@Pipe({
  name: 'swImgPath'
})
export class SwImgPathPipe implements PipeTransform {

  constructor(
    private serverPathPipe: SwServerPathPipe
  ) {}

  transform(value: string): any {
    return value
      ? value.toString().includes('data:image')
        ? value
        : this.serverPathPipe.transform(value)
      : '';
  }

}
