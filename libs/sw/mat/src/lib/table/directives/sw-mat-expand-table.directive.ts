import { Directive, ElementRef, HostBinding, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[swMatExpandTable]'
})
export class SwMatExpandTableDirective {

  private opened: boolean;

  @HostBinding('class.expanded')
  get expended(): boolean {
    return this.opened;
  }

  @Input() row: any;

  @Input() expandTemplate: TemplateRef<any>;

  constructor(private vcRef: ViewContainerRef, private el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  onClick(event): void {
    if (this.opened) {
      this.vcRef.clear();
      this.el.nativeElement.getElementsByClassName('mat-cell')[0].getElementsByClassName('mat-icon')[0].textContent = 'add';
    } else {
      this.render();
      this.el.nativeElement.getElementsByClassName('mat-cell')[0].getElementsByClassName('mat-icon')[0].textContent = 'remove';
    }
    this.opened = this.vcRef.length > 0;
  }

  private render(): void {
    this.vcRef.createEmbeddedView(this.expandTemplate, { $implicit: this.row });
  }
}
