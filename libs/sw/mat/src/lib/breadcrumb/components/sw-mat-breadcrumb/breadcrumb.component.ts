import { Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, PRIMARY_OUTLET, Router } from '@angular/router';
import { SwMatBreadcrumb } from '../../models';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SwBaseComponent } from 'sw-ng';

@Component({
  selector: 'sw-mat-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  animations: [
    trigger('animation', [
      transition(
        ':enter', [
          style({transform: 'translateY(0%)', opacity: 0}),
          animate('500ms ease-in', style({transform: 'translateY(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateY(0)', 'opacity': 1}),
          animate('500ms ease-out', style({transform: 'translateY(0%)', 'opacity': 0}))
        ]
      )
    ]),
    trigger('rotatedState', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(-180deg)' })),
      transition('true => false', animate('400ms ease-out')),
      transition('false => true', animate('400ms ease-in'))
    ])
  ]
})
export class BreadcrumbComponent extends SwBaseComponent implements OnInit {

  breadcrumbList: Array<SwMatBreadcrumb> = [];

  isXsView: boolean;

  isToolOpen = false;

  toolButtonIcon = 'build';

  _expansionBreadcrumb: Array<SwMatBreadcrumb> = [];

  @Input() buttonTemplate: TemplateRef<any>;

  @Input()
  get expansionBreadcrumb() {
    return this._expansionBreadcrumb;
  }
  set expansionBreadcrumb(value) {
    this._expansionBreadcrumb = value;
    this.parserBreadcrumb();
  }

  @Input() mobileWidth = 450;

  @ViewChild('container') container: ElementRef;

  @HostListener('window:resize')
  onResize() {
    this.getIsXsView();
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.parserBreadcrumb();
    setTimeout(() => this.getIsXsView(), 0);
  }

  parserBreadcrumb() {
    this.breadcrumbList = this.getBreadcrumbs(this.activatedRoute.root);

    // remove duplicate element by label
    this.breadcrumbList = Object.values(this.breadcrumbList.reduce((acc, cur) => Object.assign(acc, {[cur.title && cur.icon]: cur}), {}));

    this.breadcrumbList = this.breadcrumbList.concat(this.expansionBreadcrumb);
  }

  getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<SwMatBreadcrumb> = []): Array<SwMatBreadcrumb> {
    // get the child routes
    const children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      // verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty('title')) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // add breadcrumb
      const childData = child.snapshot.data as SwMatBreadcrumb;
      const breadcrumb: SwMatBreadcrumb = {
        title: childData.title,
        isLink: (childData.isLink === null || childData.isLink === undefined) ? true : childData.isLink,
        path: this.getPath(child.snapshot),
        icon: childData.icon
      };
      if (breadcrumbs.length === 0) {
        breadcrumbs.push(breadcrumb);
      } else if (breadcrumbs[breadcrumbs.length - 1].title !== breadcrumb.title && breadcrumbs[breadcrumbs.length - 1].icon !== breadcrumb.icon) {
        breadcrumbs.push(breadcrumb);
      }


      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  getIsXsView() {
    this.isXsView = (this.container.nativeElement as HTMLElement).offsetWidth < this.mobileWidth;
  }

  clickToolButton() {
    this.isToolOpen = !this.isToolOpen;
    setTimeout(() => this.toolButtonIcon = (this.isToolOpen) ? 'close' : 'build', 200);
  }

  getPath = (activatedRouteSnapshot: ActivatedRouteSnapshot) => (activatedRouteSnapshot['_lastPathIndex'] === -1)
    ? ''
    : `${this.getPath(activatedRouteSnapshot.parent)}/${activatedRouteSnapshot.url.map(segment => segment.path).join('/')}`

}
