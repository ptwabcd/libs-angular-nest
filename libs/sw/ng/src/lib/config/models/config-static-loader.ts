import { ConfigLoader } from './config-loader';

/**
 * The Config Static Loader Class
 * @implements ConfigLoader
 */
export class ConfigStaticLoader implements ConfigLoader {

  /**
   * The ConfigHttpLoader Class constructor
   * @param {any} settings
   */
  constructor(private readonly settings?: any) {
  }

  /**
   * This method can get static settings data
   * @returns {any} static settings data
   */
  loadSettings(): any {
    return Promise.resolve(this.settings);
  }

}
