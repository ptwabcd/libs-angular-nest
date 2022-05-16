import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwBaseComponent } from 'sw-ng';
import { SwItem } from 'sw-common';

@Component({
  selector: 'sw-mat-group-checkbox',
  templateUrl: './sw-mat-group-checkbox.component.html',
  styleUrls: ['./sw-mat-group-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwMatGroupCheckboxComponent,
      multi: true,
    }
  ]
})
export class SwMatGroupCheckboxComponent extends SwBaseComponent implements OnInit, ControlValueAccessor {

  _syncValue: Array<string | number>;

  @Input() items: Array<SwItem> = [];

  @Input() disabled: boolean;

  @Input() notOptionalValues: Array<string | number> = [];

  @Input() isDisabledChecked = false;

  @Input() width = 180;

  @Input()
  get syncValue() {
    return this._syncValue;
  }
  set syncValue(value) {
    this._syncValue = value;
    this.selectValue(value);
  }

  selection: SelectionModel<string | number> = new SelectionModel<string | number>(true, []);

  onChange: (value: Array<string | number>) => void;

  onTouched: () => {};

  constructor(
    private ref: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {}

  changeValue(event, value) {
    this.selection.toggle(value);
    this.onChange(this.selection.selected);
  }

  selectValue(value: Array<string | number> | string) {
    this.selection.clear();
    if (value) {
      if (typeof value === 'string') {
        value.split(',').forEach(item => this.selection.select(item));
      } else {
        value.forEach(item => this.selection.select(item));
      }
    }
  }


  registerOnChange(fn: (value: Array<string | number>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(data: Array<string | number> | string): void {
    if (data) {
      setTimeout(() => this.selectValue(data), 0);
    }
  }

  /**
   * 檢查可選擇的項目是否包含在排除清單
   */
  isOptionalDisabled(value: string | number): boolean {
    return (this.notOptionalValues.indexOf(value) > -1);
  }

  isOptionalDisabledFn(value: string | number): boolean {
    return (this.notOptionalValues.indexOf(value) > -1) && this.isDisabledChecked;
  }

}
