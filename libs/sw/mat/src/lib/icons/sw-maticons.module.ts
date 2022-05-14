import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwMatIconService } from './services';

export function iconFactory(iconService: SwMatIconService) {
  return () => iconService.init();
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SwMaticonsModule {
  static forRoot(): ModuleWithProviders<SwMaticonsModule> {
    return {
      ngModule: SwMaticonsModule,
      providers: [
        SwMatIconService,
        {
          provide: APP_INITIALIZER,
          useFactory: iconFactory,
          deps: [SwMatIconService],
          multi: true
        },
      ]
    };
  }
}
