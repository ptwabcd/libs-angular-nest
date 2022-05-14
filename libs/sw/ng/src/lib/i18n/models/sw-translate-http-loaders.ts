import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export class SwTranslateHttpLoaders implements TranslateLoader {
  constructor(private http: HttpClient,
              public resources: { prefix: string, suffix: string }[] = [{
                prefix: '/assets/i18n/',
                suffix: '.json'
              }]) {}

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  getTranslation(lang: string): any {
    return forkJoin(this.resources.map(config => {
      return this.http.get(`${config.prefix}${lang}${config.suffix}?${new Date().getTime()}`);
    })).pipe(
      map(response => {
        return response.reduce((a, b) => {
          return Object.assign(a, b);
        });
      })
    );
  }
}
