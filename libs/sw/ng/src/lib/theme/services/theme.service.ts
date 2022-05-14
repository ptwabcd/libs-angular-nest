import { EventEmitter, Output, Injectable } from '@angular/core';
import { ThemeType } from '../enums/theme-type.enum';

@Injectable()
export class ThemeService {

  @Output() change: EventEmitter<ThemeType> = new EventEmitter();

  changeTheme(theme: ThemeType) {
    localStorage.setItem('theme', theme);
    this.change.emit(theme);
  }
}
