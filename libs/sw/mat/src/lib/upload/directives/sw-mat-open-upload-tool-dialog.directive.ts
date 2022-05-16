import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SwBaseComponent } from 'sw-ng';
import { SwMatUploadToolDialogComponent } from '../components';
import { SwUploadToolConfig, SwUploadToolResult } from 'sw-common';

@Directive({
  selector: '[swMatOpenUploadToolDialog]'
})
export class SwMatOpenUploadToolDialogDirective extends SwBaseComponent {

  @Input() currentFile: string;
  @Input() originalFile: string;

  @Output() selectionChange: EventEmitter<SwUploadToolResult> = new EventEmitter<SwUploadToolResult>();

  @HostListener('click')
  onClick() {
    this.dialog.open<SwMatUploadToolDialogComponent, SwUploadToolConfig, SwUploadToolResult>(SwMatUploadToolDialogComponent, {
      ...this.toolDialogConfig,
      data: {
        currentFile: this.currentFile,
        originalFile: this.originalFile
      }
    }).afterClosed().pipe(takeUntil(this.destroyed$)).subscribe((result: SwUploadToolResult) => {
      if (result) {
        this.selectionChange.emit(result);
      }
    });
  }

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

}
