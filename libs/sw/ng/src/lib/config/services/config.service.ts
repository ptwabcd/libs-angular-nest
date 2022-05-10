import { EventEmitter, Injectable, Output } from '@angular/core';
import { ConfigLoader } from '../models/config-loader';

@Injectable()
export class ConfigService {
  /**
   * Local reference of ConfigLoader
   */
  loader: ConfigLoader;

  /**
   * settings type is any
   */
  settings: any;

  @Output() changeLang: EventEmitter<string> = new EventEmitter();

  constructor(loader: ConfigLoader) {
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
