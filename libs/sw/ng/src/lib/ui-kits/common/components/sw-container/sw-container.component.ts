import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { SwBaseComponent } from '../../../../utils';

@Component({
  selector: 'sw-container',
  templateUrl: './sw-container.component.html',
  styleUrls: ['./sw-container.component.scss']
})
export class SwContainerComponent extends SwBaseComponent implements OnInit {

  @Input() resolved: boolean;

  @Input() error: boolean;

  @Input() isEmpty: boolean;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    super();
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
  }

  ngOnInit() {}

}
