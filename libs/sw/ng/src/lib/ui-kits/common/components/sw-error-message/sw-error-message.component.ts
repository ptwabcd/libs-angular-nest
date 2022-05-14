import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sw-error-message',
  templateUrl: './sw-error-message.component.html',
  styleUrls: ['./sw-error-message.component.scss']
})
export class SwErrorMessageComponent implements OnInit {

  @Input() control: FormControl;
  @Input() isTouch = false;

  @Input() requiredText = this.translateService.instant('THIS_FIELD_IS_REQUIRED');
  @Input() emailText = this.translateService.instant('EMAIL_FORMAT_ERROR');
  @Input() enNumberText = this.translateService.instant('THIS_FIELD_NEED_ENGLISH_MATH_MIXED');

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {
  }
}
