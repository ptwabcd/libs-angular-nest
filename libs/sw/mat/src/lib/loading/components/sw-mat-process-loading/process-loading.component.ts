import { Component, Input, OnInit } from '@angular/core';
import { SwBaseComponent } from 'sw-ng';
import { SwMatDialogService } from '../../../utils';

@Component({
  selector: 'libs-process-loading',
  templateUrl: './process-loading.component.html',
  styleUrls: ['./process-loading.component.scss']
})
export class ProcessLoadingComponent extends SwBaseComponent implements OnInit {

  @Input() resolved: boolean;

  @Input()
  get error() {
    return this.inputError;
  }
  set error(value: boolean) {
    this.inputError = value;
    if (value) {
      this.resolved = true;
      setTimeout(() => this.openAlertDialog(), 0);
    }
  }

  @Input() isFullScreen = false;

  inputError: boolean;


  constructor(
    private dialogService: SwMatDialogService,
  ) {
    super();
  }

  ngOnInit() {
  }

  openAlertDialog() {
    this.dialogService.alertDialog('系統發生錯誤，請再重試一次', this.ALERT_TYPE.WARN);
  }

}