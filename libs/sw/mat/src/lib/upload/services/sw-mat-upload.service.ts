import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwBaseComponent, SwFileSizePipe } from 'sw-ng';
import { SwMatDialogService } from '../../utils/services/sw-mat-dialog.service';
import { SwUploadInfo } from 'sw-common';

@Injectable()
export class SwMatUploadService extends SwBaseComponent {

  constructor(
    private dialogService: SwMatDialogService,
    private fileSize: SwFileSizePipe,
    private translate: TranslateService
  ) {
    super();
  }

  uploadValidator(file: File | FileList, maxSize: number, uploadAbleTypes: Array<string>): boolean {
    const uploadInfo: SwUploadInfo = {
      isValidator: true,
      message: ''
    };
    if (file instanceof File) {
      this.uploadRules(file, maxSize, uploadAbleTypes, uploadInfo);
    } else if (file instanceof FileList) {
      for (let index = 0; index < file.length; index++) {
        this.uploadRules(file.item(index), maxSize, uploadAbleTypes, uploadInfo);
      }
    }
    if (!uploadInfo.isValidator) {
      this.dialogService.alertDialog(uploadInfo.message, this.ALERT_TYPE.WARN);
    }
    return uploadInfo.isValidator;
  }

  uploadRules(file: File, maxSize: number, uploadAbleTypes: Array<string>, uploadInfo: SwUploadInfo) {
    if (file.size > maxSize) {
      uploadInfo.message += `${file.name}${this.translate.instant('SIZE_MUST_BE_EXCEED')}${this.fileSize.transform(maxSize)}\n`;
      uploadInfo.isValidator = false;
    }

    if (uploadAbleTypes.indexOf(file.name.split('.').pop().toLowerCase()) === -1) {
      uploadInfo.message += `${file.name}${this.translate.instant('FILE_FORMAT_MUST_BE')}${uploadAbleTypes.toString()}\n`;
      uploadInfo.isValidator = false;
    }
    return uploadInfo;
  }

}
