import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { TranslateService } from '@ngx-translate/core';
import { SwBaseComponent } from 'sw-ng';
import { SwMatAlertDialogComponent, SwMatDialogService } from '../../../utils';

@Component({
  selector: 'sw-mat-loading',
  templateUrl: './sw-mat-loading.component.html',
  styleUrls: ['./sw-mat-loading.component.scss']
})
export class SwMatLoadingComponent extends SwBaseComponent implements OnInit, OnDestroy {

  _resolved: boolean;

  _obs: boolean;

  _error: boolean;

  loadingDialog: MatDialogRef<SwMatAlertDialogComponent>;

  @Input()
  get obs() {
    return this._obs;
  }
  set obs(value) {
    this._obs = value;
    if (this._obs) {
      this.loadingDialog = this.dialogService.imgDialog('loading...', './assets/images/loading.gif');
    }
  }

  @Input()
  get resolved() {
    return this._resolved;
  }
  set resolved(value) {
    this._resolved = value;
    if (this._resolved && this.loadingDialog) {
      this.loadingDialog.close();
    }
  }

  @Input()
  get error() {
    return this._error;
  }
  set error(value) {
    this._error = value;
    if (this._error) {
      if (this.loadingDialog) {
        this.loadingDialog.close();
      }
      this.dialogService.alertDialog(this.translateService.instant('SYSTEM_ERROR_PLEASE_TRY_AGAIN'), this.ALERT_TYPE.WARN);
    }
  }


  constructor(
    private translateService: TranslateService,
    private dialogService: SwMatDialogService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    super();
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
  }

  ngOnInit(): void {
  }

  override ngOnDestroy(): void {
    if (this.loadingDialog) {
      this.loadingDialog.close();
    }
  }
}
