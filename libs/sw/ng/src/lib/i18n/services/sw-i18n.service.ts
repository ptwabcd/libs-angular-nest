import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwConfigService } from '../../config/services';

@Injectable()
export class SwI18nService {

  constructor(
    private configService: SwConfigService,
    private translate: TranslateService
  ) { }

  initTranslate() {
    // 多語系設定
    this.translate.addLangs(this.configService.getConfig('LANGUAGES'));
    if (this.configService.getConfig('DEFAULT_LANGUAGE')) {
      this.translate.setDefaultLang(this.configService.getConfig('DEFAULT_LANGUAGE'));
    } else {
      // 預設語系，以 Browser 預設語言當作主要語系預設值
      this.translate.setDefaultLang(this.browserLangToSystemLang(this.translate.getBrowserCultureLang()));
    }
  }

  browserLangToSystemLang(localeKey: string = ''): string {
    if (localeKey === 'zh-TW' || localeKey === 'zh') {
      return 'zh_tw';
    } else if ( localeKey === 'zh-CN') {
      return 'zh_cn';
    } else if ( localeKey === 'en-US' || localeKey === 'en') {
      return 'en';
    }
    return 'zh_tw';
  }

  setLang(langKey: string) {
    localStorage.setItem('lang', langKey);
    this.translate.setDefaultLang(langKey);
  }
}
