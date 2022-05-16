import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwMatIconSelectDialogComponent } from './icons';
import { SwMatOpenIconSelectDialogDirective } from './icons';
import { SwMatIconComponent } from './icons';
import { SwMatTaiwanAddressComponent } from './input';
import { SwMatColumnSortingDisplayDialogComponent } from './table';
import { SwMatOpenUploadToolDialogDirective } from './upload';
import { SwMatLoadingComponent } from './loading';
import { SwMatAlertDialogComponent } from './utils';
import { SwMatUploadToolDialogComponent } from './upload';
import { SwMatAvatarComponent } from './utils';
import { BreadcrumbComponent } from './breadcrumb';
import { SwMatGroupCheckboxComponent } from './input';
import { SwMatI18nSelectionComponent } from './lang';
import { SwMatNoDataComponent } from './utils';
import { SwMatPrintContentComponent } from './print';
import { SwMatProcessLoadingComponent } from './loading';
import { SwMatProgressBarComponent } from './loading';
import { SwMatTableComponent } from './table';
import { SwMatTimeSelectorComponent } from './input';
import { SwMatTreeComponent } from './tree';
import { SwMatVirtualScrollSelectComponent } from './input';
import { SwMatPrintBaseComponent } from './print';
import { SwMatFileUploadDirective } from './upload';
import { SwMatExpandTableDirective } from './table';
import { MaterialModule } from './modules';
import { SwNgModule } from 'sw-ng';
import { SwMatDialogService } from './utils';
import { SwMatUploadService } from './upload';
import { SortablejsModule } from 'ngx-sortablejs';

const COMPONENTS = [
  SwMatAvatarComponent,
  BreadcrumbComponent,
  SwMatGroupCheckboxComponent,
  SwMatI18nSelectionComponent,
  SwMatNoDataComponent,
  SwMatPrintContentComponent,
  SwMatProcessLoadingComponent,
  SwMatProgressBarComponent,
  SwMatTableComponent,
  SwMatTimeSelectorComponent,
  SwMatTreeComponent,
  SwMatVirtualScrollSelectComponent,
  SwMatIconComponent,
  SwMatTaiwanAddressComponent,
  SwMatPrintBaseComponent,
  SwMatAlertDialogComponent,
  SwMatIconSelectDialogComponent,
  SwMatUploadToolDialogComponent
];

const DIRECTIVES = [
  SwMatExpandTableDirective,
  SwMatFileUploadDirective,
  SwMatOpenIconSelectDialogDirective,
  SwMatOpenUploadToolDialogDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    SwMatColumnSortingDisplayDialogComponent,
    SwMatLoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SwNgModule,
    SortablejsModule
  ],
  providers: [
    SwMatDialogService,
    SwMatUploadService
  ],
  exports: [
    MaterialModule,
    ...COMPONENTS,
    ...DIRECTIVES,
    SwMatLoadingComponent
  ]
})
export class SwMatModule {
}
