import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { SwBaseComponent } from '../models';

@Directive({
  selector: '[swCurrentPage]'
})
export class SwCurrentPageDirective extends SwBaseComponent implements OnInit {
  // # 後面的url
  @Input('swCurrentPage') swCurrentPage: string | Array<string>;

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
    const swCurrentPage = (typeof this.swCurrentPage === 'string') ? [this.swCurrentPage] : this.swCurrentPage;
    return swCurrentPage.filter(page => this.router.url === page).length > 0;
  }

}
