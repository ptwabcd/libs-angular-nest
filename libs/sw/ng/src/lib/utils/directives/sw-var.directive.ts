import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[swVar]'
})
export class SwVarDirective {
  @Input()
  set libsVar(context: unknown) {
    this.context.$implicit = this.context.libsVar = context;

    if (!this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef, this.context);
      this.hasView = true;
    }
  }

  private context: {
    $implicit: unknown;
    libsVar: unknown;
  } = {
    $implicit: null,
    libsVar: null,
  };

  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
