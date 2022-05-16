import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NumberPrototype } from 'sw-common';

@Component({
  selector: 'sw-mat-avatar',
  templateUrl: './sw-mat-avatar.component.html',
  styleUrls: ['./sw-mat-avatar.component.scss']
})
export class SwMatAvatarComponent implements OnInit, OnChanges {

  @Input() size = 50;
  @Input() textSizeRatio = 3;
  @Input() bgColor: string;
  @Input() fgColor = '#FFF';
  @Input() borderColor: string;
  @Input() style: any = {};
  @Input() src: string;
  @Input() name: string;
  @Input() icon: string;
  @Input() iconColor: string;

  avatarStyle: any = {};
  hostStyle: any = {};
  iconSize: number;

  constructor() {}

  ngOnInit() {
    // Host style
    this.hostStyle = {
      width: this.size + 'px',
      height: this.size + 'px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    this.setAvatarStyle();
    this.iconSize = NumberPrototype.division(this.size, 3);
  }

  setAvatarStyle() {
    if (this.src) {
      this.avatarStyle = this._imageStyle();
    } else {
      this.avatarStyle = this._initialsStyle();
    }
  }

  ngOnChanges() {
    this.setAvatarStyle();
  }

  /**
   *
   * @returns initials style
   *
   * @memberOf SwMatAvatarComponent
   */
  _initialsStyle() {
    return {
      position: 'relative',
      textAlign: 'center',
      borderRadius: '100%',
      border: this.borderColor ? '1px solid ' + this.borderColor : '',
      textTransform: 'uppercase',
      color: this.fgColor,
      backgroundColor: this.bgColor ? this.bgColor : 'red',
      font: Math.floor(this.size / this.textSizeRatio) + 'px Helvetica, Arial, sans-serif',
      lineHeight: this.size + 'px',
      width: this.size + 'px',
      height: this.size + 'px',
      ...this.style
    };

  }

  /**
   *
   * @returns image style
   *
   * @memberOf SwMatAvatarComponent
   */
  _imageStyle() {
    return {
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
      border: this.borderColor ? '1px solid ' + this.borderColor : '',
      width: this.size,
      height: this.size,
      ...this.style
    };
  }
}
