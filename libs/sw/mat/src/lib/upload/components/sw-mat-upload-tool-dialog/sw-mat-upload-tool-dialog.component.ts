import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SwUploadToolResult, SwUploadToolConfig } from 'sw-common';

@Component({
  selector: 'libs-upload-bottom-sheet',
  templateUrl: './sw-mat-upload-tool-dialog.component.html',
  styleUrls: ['./sw-mat-upload-tool-dialog.component.scss']
})
export class SwMatUploadToolDialogComponent implements OnInit {

  formControl: FormControl = new FormControl();

  constructor(
    private dialogRef: MatDialogRef<SwMatUploadToolDialogComponent, SwUploadToolResult>,
    @Inject(MAT_DIALOG_DATA) public data: SwUploadToolConfig,
  ) { }

  ngOnInit() {
  }

  dismiss(dataUrl: string, file: File) {
    this.dialogRef.close({dataUrl, file});
  }

}
