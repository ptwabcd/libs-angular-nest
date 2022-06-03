import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwNgModule } from 'sw-ng';
import { SwDate } from 'sw-common';
import { MaterialModule, SwMatModule } from 'sw-mat';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SwNgModule,
    SwMatModule,
    MaterialModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SwDate
      ]
    };
  }
}
