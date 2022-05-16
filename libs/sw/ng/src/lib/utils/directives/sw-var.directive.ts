import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[swVar]'
})
export class SwVarDirective {
  @Input()
  set swVar(context: unknown) {
    this.context.$implicit = this.context.swVar = context;

    if (!this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef, this.context);
      this.hasView = true;
    }
  }

  private context: {
    $implicit: unknown;
    swVar: unknown;
  } = {
    $implicit: null,
    swVar: null,
  };

  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
