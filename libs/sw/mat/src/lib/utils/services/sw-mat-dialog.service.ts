import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SwBaseComponent } from 'sw-ng';
import { SwAlertType, SwStatusData } from 'sw-common';
import { SwMatAlertDialogComponent } from '../components';

@Injectable()
export class SwMatDialogService extends SwBaseComponent implements OnDestroy  {

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    super();
  }

  alertDialog(message: string = this.translate.instant('SUCCESSFUL_OPERATION'), type: SwAlertType = this.ALERT_TYPE.SUCCESS): MatDialogRef<SwMatAlertDialogComponent, boolean> {
    return this.dialog.open(SwMatAlertDialogComponent, {
      ...this.defaultAlertDialogConfig,
      data: {
        type: type,
        message: this.translate.instant(message),
        showCancelButton: false
      }
    });
  }

  actionResponseDialog(actionResponse: SwStatusData, message: string = null): MatDialogRef<SwMatAlertDialogComponent, boolean> {
    message = message ? message : actionResponse.message;
    return this.alertDialog(message, (actionResponse.isSuccess) ? this.ALERT_TYPE.SUCCESS : this.ALERT_TYPE.WARN);
  }

  confirmDialog(message: string = this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_REMOVE_THE_SELECTED_DATA')): MatDialogRef<SwMatAlertDialogComponent, boolean> {
    return this.dialog.open(SwMatAlertDialogComponent, {
      ...this.defaultAlertDialogConfig,
      data: {
        type: this.ALERT_TYPE.QUESTION,
        message: message,
        showCancelButton: true
      }
    });
  }

  imgDialog(message: string, img: string, showConfirmButton = false, showCancelButton = false) {
    return this.dialog.open(SwMatAlertDialogComponent, {
      ...this.defaultAlertDialogConfig,
      data: {
        type: this.ALERT_TYPE.IMG,
        message,
        showCancelButton,
        showConfirmButton,
        img
      }
    });
  }
}
