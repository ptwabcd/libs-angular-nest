import { Pipe, PipeTransform } from '@angular/core';

/**
 * 判斷icon 是否為 Font Awesome
 */
@Pipe({
  name: 'swIsFaIcon'
})
export class SwIsFaIconPipe implements PipeTransform {

  transform(iconName: string): boolean {
    const regex = new RegExp(/^fa-./g);
    return regex.test(iconName);
  }

}
