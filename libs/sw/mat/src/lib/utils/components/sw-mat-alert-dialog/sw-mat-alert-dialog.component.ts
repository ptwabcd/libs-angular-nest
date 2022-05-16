import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { SwBaseComponent, SwIsNullOrUndefinedPipe } from 'sw-ng';
import { SwAlertType } from 'sw-common';


@Component({
  selector: 'sw-mat-alert-dialog',
  templateUrl: './sw-mat-alert-dialog.component.html',
  styleUrls: ['./sw-mat-alert-dialog.component.scss']
})
export class SwMatAlertDialogComponent extends SwBaseComponent implements OnInit {
  type: SwAlertType;
  message: string | Array<string>;
  showCancelButton: boolean;
  showConfirmButton: boolean;

  cancelButtonText: string;
  confirmButtonText: string;

  enableAsyncMode: boolean;

  beforeClose = new EventEmitter();
  close = new EventEmitter();

  processing: boolean;

  img: string;

  constructor(
    private isNullOrUndefined: SwIsNullOrUndefinedPipe,
    private dialogRef: MatDialogRef<SwMatAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
    if (data) {

      this.message = (!data.message) ? '' : ((typeof data.message !== 'string') ? data.message.join('\r\n') : data.message);
      this.type = (!data.type) ? '' : data.type;

      this.showCancelButton = this.isNullOrUndefined.transform(data.showCancelButton) ? true : data.showCancelButton;
      this.showConfirmButton = this.isNullOrUndefined.transform(data.showConfirmButton) ? true : data.showConfirmButton;

      this.cancelButtonText = (!data.cancelButtonText) ? '取消' : data.cancelButtonText;
      this.confirmButtonText = (!data.confirmButtonText) ? '確認' : data.confirmButtonText;

      this.enableAsyncMode = this.isNullOrUndefined.transform(data.enableAsyncMode) ? false : data.enableAsyncMode;

      this.img =  (!data.img) ? '' : data.img;
    }
  }

  ngOnInit() {

  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    if (this.enableAsyncMode) {
      this.processing = true;
      this.beforeClose.emit();
      this.close.pipe(takeUntil(this.destroyed$)).subscribe(() => {
        this.processing = false;
        this.dialogRef.close(true);
      });
    } else {
      this.dialogRef.close(true);
    }
  }

}
