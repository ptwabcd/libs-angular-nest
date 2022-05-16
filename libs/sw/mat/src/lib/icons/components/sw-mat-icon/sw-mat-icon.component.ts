import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sw-mat-icon',
  templateUrl: './sw-mat-icon.component.html',
  styleUrls: ['./sw-mat-icon.component.scss']
})
export class SwMatIconComponent implements OnInit {

  isMatColor = false;
  _color: 'primary' | 'accent' | 'warn' | string = 'primary';
  @Input() iconName: string;
  @Input() fontIcon: string;
  @Input() size = 24;
  @Input()
  get color(): 'primary' | 'accent' | 'warn' | string {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
    this.isMatColor = value === 'primary' || this.color === 'accent' || this.color === 'warn';
  }
  @Input() swClass = {};
  @Input() swStyle = {};

  constructor() { }

  ngOnInit() {}

}
