import { EventEmitter, Injectable, Output } from '@angular/core';
import { SwConfigLoader } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SwConfigService {
  /**
   * Local reference of ConfigLoader
   */
  loader: SwConfigLoader;

  /**
   * settings type is any
   */
  settings: any;

  @Output() changeLang: EventEmitter<string> = new EventEmitter();

  constructor(loader: SwConfigLoader) {
    this.loader = loader;
  }

  /**
   * This method is initialization settings
   * @returns {any}
   */
  init(): any {
    return this.loader.loadSettings().then((res) => {
        this.settings = res;
      }
    );
  }

  getConfig(key: string) {
    return this.settings[key];
  }

}
