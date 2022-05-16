import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SwBaseComponent, SwNgColumn } from 'sw-ng';

@Component({
  selector: 'sw-mat-column-sorting-display-dialog',
  templateUrl: './sw-mat-column-sorting-display-dialog.component.html',
  styleUrls: ['./sw-mat-column-sorting-display-dialog.component.scss']
})
export class SwMatColumnSortingDisplayDialogComponent extends SwBaseComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SwMatColumnSortingDisplayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: Array<SwNgColumn>
  ) {
    super();
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  confirm() {
    this.dialogRef.close(this.data);
  }
}
