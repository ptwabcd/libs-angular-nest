
import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { SwMatPrintContentComponent } from '../components';
import { SwBaseComponent } from 'sw-ng';

@Directive({
  selector: '[swMatPrintBase]'
})
export  class SwMatPrintBaseComponent extends SwBaseComponent {

  @Input() printContentComponent: SwMatPrintContentComponent;

  @Output() isDataReady: EventEmitter<boolean> = new EventEmitter<boolean>();

  print() {
    this.isDataReady.emit(true);
  }

  printError() {
    this.isDataReady.emit(false);
  }
}
