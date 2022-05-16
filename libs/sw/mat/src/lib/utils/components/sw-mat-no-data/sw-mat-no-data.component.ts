import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sw-mat-no-data',
  templateUrl: './sw-mat-no-data.component.html',
  styleUrls: ['./sw-mat-no-data.component.scss']
})
export class SwMatNoDataComponent implements OnInit {

  @Input() iconName = 'search';

  @Input() content = this.translate.instant('NO_DATA');

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

}
