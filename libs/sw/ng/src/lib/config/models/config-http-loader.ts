import { ConfigLoader } from './config-loader';
import { HttpClient } from '@angular/common/http';

/**
 * The Config Http Loader Class
 * @implements ConfigLoader
 */
export class ConfigHttpLoader implements ConfigLoader {
  /**
   * The ConfigHttpLoader Class constructor
   * @param {HttpClient} http
   * @param {string} endpoint. default value is ./assets/configs/default.json'
   */
  constructor(private http: HttpClient,
              private endpoint: string = './assets/configs/router.json') {
  }

  /**
   * This method can get setting from http get endpoint json file
   * @returns {any} http response data
   */
  loadSettings(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.endpoint)
        .subscribe(res => resolve(res), () => reject('Endpoint unreachable!'));
    });
  }
}
