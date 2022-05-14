import { Directive, DoCheck, Host, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgSwitch } from '@angular/common';

@Directive({
  selector: '[swSwitchCases]'
})
export class SwSwitchCasesDirective implements OnInit, DoCheck {
  private ngSwitch: any;
  private _created = false;

  @Input()
  sharedSwitchCases: any[];

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<Object>,
    @Host() ngSwitch: NgSwitch
  ) {
    this.ngSwitch = ngSwitch;
  }

  ngOnInit() {
    (this.sharedSwitchCases || []).forEach(() => this.ngSwitch._addCase());
  }

  ngDoCheck() {
    let enforce = false;
    (this.sharedSwitchCases || []).forEach(value => enforce = this.ngSwitch._matchCase(value) || enforce)      ;
    this.enforceState(enforce);
  }
  enforceState(created: boolean) {
    if (created && !this._created) {
      this._created = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!created && this._created) {
      this._created = false;
      this.viewContainer.clear();
    }
  }
}
