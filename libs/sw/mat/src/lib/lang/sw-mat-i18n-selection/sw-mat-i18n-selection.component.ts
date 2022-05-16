import { Component, OnInit } from '@angular/core';
import { SwI18nService } from 'sw-ng';

@Component({
  selector: 'libs-mat-i18n-selection',
  templateUrl: './sw-mat-i18n-selection.component.html',
  styleUrls: ['./sw-mat-i18n-selection.component.scss']
})
export class SwMatI18nSelectionComponent implements OnInit {

  constructor(
    private libsTranslateService: SwI18nService
  ) { }

  ngOnInit() {
  }

  /**
   * 切換語系
   */
  setLang(lang) {
    this.libsTranslateService.setLang(lang);
  }

}
