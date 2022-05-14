import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { SwBaseComponent } from '../models/sw-base-component';

@Directive({
  selector: '[swCurrentPage]'
})
export class SwCurrentPageDirective extends SwBaseComponent implements OnInit {
  // # 後面的url
  @Input('libsCurrentPage') libsCurrentPage: string | Array<string>;

  constructor(
    private router: Router,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    super();
  }

  ngOnInit(): void {
    this.confirmViewContainer();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this.destroyed$)).subscribe(() => {
      this.viewContainer.clear();
      this.confirmViewContainer();
    });
  }

  confirmViewContainer() {
    if (this.isIncludeCurrentPage()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  isIncludeCurrentPage() {
    const libsCurrentPage = (typeof this.libsCurrentPage === 'string') ? [this.libsCurrentPage] : this.libsCurrentPage;
    return libsCurrentPage.filter(page => this.router.url === page).length > 0;
  }

}
