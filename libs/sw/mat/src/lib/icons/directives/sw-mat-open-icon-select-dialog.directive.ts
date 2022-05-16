import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SwBaseComponent } from 'sw-ng';
import { SwMatIconSelectDialogComponent } from '../components/sw-mat-icon-select-dialog/sw-mat-icon-select-dialog.component';

@Directive({
  selector: '[swMatOpenIconSelectDialog]'
})
export class SwMatOpenIconSelectDialogDirective extends SwBaseComponent {

  @Input() icon: string;

  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click')
  onClick() {
    this.dialog.open<SwMatIconSelectDialogComponent>(SwMatIconSelectDialogComponent, {
      ...this.maxSmDialogConfig,
      data: this.icon
    }).afterClosed().pipe(takeUntil(this.destroyed$)).subscribe(value => {
      if (value) {
        this.selectionChange.emit(value);
      }
    });
  }

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

}
