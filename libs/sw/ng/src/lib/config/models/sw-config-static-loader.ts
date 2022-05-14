import { SwConfigLoader } from './sw-config-loader';

/**
 * The Config Static Loader Class
 * @implements SwConfigLoader
 */
export class SwConfigStaticLoader implements SwConfigLoader {

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
