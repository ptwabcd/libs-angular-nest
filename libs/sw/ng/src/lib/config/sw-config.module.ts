import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwConfigService } from './services';
import { SwServerPathPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SwServerPathPipe
  ],
  providers: [
    SwServerPathPipe
  ],
  declarations: [SwServerPathPipe]
})

export class SwConfigModule {
  static forRoot(configProvider: any ): ModuleWithProviders<SwConfigModule> {
    return {
      ngModule: SwConfigModule,
      providers: [
        configProvider,
        SwConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: (config: SwConfigService) => () => config.init(),
          deps: [SwConfigService],
          multi: true
        },
      ]
    };
  }
}
