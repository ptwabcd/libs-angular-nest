import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SwPatternType } from 'sw-common';
import { SwBaseComponent } from '../models/sw-base-component';

@Directive({
  selector: '[swInputPattern]'
})
export class SwInputPatternDirective extends SwBaseComponent implements OnInit {

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  // ie: Left, Right, Decimal
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Left', 'Right', 'Decimal'];

  pattern: RegExp;

  @Input() patternType: SwPatternType = this.PATTERN_TYPE.EN_NUMBER_DASH;

  oldValue = '';

  constructor(
    private ngControl: NgControl
  ) {
    super();
  }

  ngOnInit(): void {
    this.pattern = new RegExp(this.patternType);
  }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    if (!this.pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (!this.pattern.test(input.value) && input.value) {
      this.ngControl.control.patchValue(this.oldValue);
    } else {
      this.ngControl.control.patchValue(input.value);
    }
    this.oldValue = input.value;

  }

}
