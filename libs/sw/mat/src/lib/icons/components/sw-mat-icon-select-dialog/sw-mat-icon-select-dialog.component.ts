import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SwIconType } from 'sw-common';
import { SwBaseComponent, SwIsFaIconPipe } from 'sw-ng';

@Component({
  selector: 'sw-mat-icon-select-dialog',
  templateUrl: './sw-mat-icon-select-dialog.component.html',
  styleUrls: ['./sw-mat-icon-select-dialog.component.scss']
})
export class SwMatIconSelectDialogComponent extends SwBaseComponent implements OnInit {
  ICON_TYPE = SwIconType;

  icons: Array<string> = [];

  iconFormControl: FormControl = new FormControl();
  iconTypeFormControl: FormControl = new FormControl();

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedIcon: string,
    private isFaIconPipe: SwIsFaIconPipe,
    private dialogRef: MatDialogRef<SwMatIconSelectDialogComponent>
  ) {
    super();
  }

  ngOnInit() {
    if (this.isFaIconPipe.transform(this.selectedIcon)) {
      this.iconTypeFormControl.setValue(this.ICON_TYPE.FA);
      this.iconFormControl.setValue(this.selectedIcon.split('fa-')[1]);
    } else {
      this.iconTypeFormControl.setValue(this.ICON_TYPE.MAT);
      this.iconFormControl.setValue(this.selectedIcon);
    }
  }

  getIcon() {
    return this.iconTypeFormControl.value === this.ICON_TYPE.MAT ? this.iconFormControl.value : `fa-${this.iconFormControl.value}`;
  }

  confirm() {
    this.dialogRef.close(this.getIcon());
  }

}
