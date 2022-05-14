import { Component } from '@angular/core';
import { SwI18nService } from 'sw-ng';

@Component({
  selector: 'full-stack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private i18nService: SwI18nService,
  ) {
    this.i18nService.initTranslate();
  }
}
