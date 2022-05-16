import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { SwBaseComponent } from 'sw-ng';
import { SwDate, SwTimeRange } from 'sw-common';

@Component({
  selector: 'sw-mat-time-selector',
  templateUrl: './sw-mat-time-selector.component.html',
  styleUrls: ['./sw-mat-time-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwMatTimeSelectorComponent,
      multi: true,
    }
  ]
})
export class SwMatTimeSelectorComponent extends SwBaseComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  onChange: (value: string) => void;
  onTouched: () => {};

  form: FormGroup;

  swDate = new SwDate();

  constructor() {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      startHour: new FormControl(null),
      endHour: new FormControl(null),
      startMinute: new FormControl(null),
      endMinute: new FormControl(null)
    });
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value: SwTimeRange) => {
      if (value.endHour && value.endMinute && value.startHour && value.startMinute) {
        if (this.swDate.timeRangeToString(value)) {
          this.onChange(this.swDate.timeRangeToString(value));
        }
      }
    });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(value: string): void {

    if (value) {
      this.form.setValue(this.swDate.splitTimeRange(value));
    } else {
      this.form.setValue({
        startHour: null,
        endHour: null,
        startMinute: null,
        endMinute: null
      });
    }
  }

}
