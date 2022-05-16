import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { SwBaseComponent, SwIsNullOrUndefinedPipe } from 'sw-ng';

@Component({
  selector: 'sw-mat-virtual-scroll-select',
  templateUrl: './sw-mat-virtual-scroll-select.component.html',
  styleUrls: ['./sw-mat-virtual-scroll-select.component.scss'],
  providers: [
    {provide: MatFormFieldControl, useExisting: SwMatVirtualScrollSelectComponent},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwMatVirtualScrollSelectComponent,
      multi: true,
    }
  ]
})
export class SwMatVirtualScrollSelectComponent extends SwBaseComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<string | number>, OnDestroy {

  static nextId = 0;

  stateChanges = new Subject<void>();

  focused = false;

  ngControl: NgControl = null;

  errorState = false;

  controlType = 'libs-virtual-scroll-select';

  stateValue: number;

  selectControl = new FormControl();

  value: string | number;
  onChange: (value: any) => void;
  onTouched: () => {};

  @Input() data: Array<any> = [];

  @Input() displayCount = 5;

  @Input() itemSize = 48;

  @Input() valueKey: string;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(required) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild('matSelect') matSelect: MatSelect;


  get empty(): boolean {
    return isNaN(Number(this.selectControl.value));
  }

  @HostBinding('class.floating') get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @HostBinding('id') id = `${this.controlType}-${SwMatVirtualScrollSelectComponent.nextId++}`;

  @HostBinding('attr.aria-describedby') describedBy = '';

  constructor(
    private isNullOrUndefinedPipe: SwIsNullOrUndefinedPipe,
    private fm: FocusMonitor,
    private elRef: ElementRef
  ) {
    super();
    fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.data.length < 5) {
      this.displayCount = this.data.length;
    }
  }

  opened() {
    this.viewport.checkViewportSize();
    this.viewport.scrollToIndex(this.getStart(2));
  }

  selectionChanged(event: MatSelectChange) {
    const value = (this.valueKey) ? this.data[event.value][this.valueKey] : this.data[event.value];
    this.onChange(value);
    this.selectionChange.emit(value);
  }

  setRenderedRange() {
    this.viewport.setRenderedRange({start: this.getStart(5), end: this.getEnd(5)});
  }

  getStart(offsetIndex: number): number {
    const start = this.selectControl.value - offsetIndex;
    return (start <= 0) ? 0 : start;
  }

  getEnd(offsetIndex: number): number {
    const end = this.selectControl.value + offsetIndex;
    return (end >= this.data.length) ? this.data.length : end;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = value => {
      this.value = value;

      fn(value);
      this.stateChanges.next();
    };
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
    }
  }

  writeValue(value: any): void {
    if (!this.isNullOrUndefinedPipe.transform(value)) {
      setTimeout(() => {
        this.selectControl.setValue(this.data.findIndex(item => (this.valueKey) ? (item[this.valueKey] === value) : (item === value)));
        this.setRenderedRange();
      }, 500);
    } else {
      this.selectControl.setValue(null);
    }
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'mat-select') {
      this.elRef.nativeElement.querySelector('mat-select').focus();
      this.matSelect.open();
    }
  }

  override ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
