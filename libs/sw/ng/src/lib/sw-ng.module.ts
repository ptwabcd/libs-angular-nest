import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwThemeModule } from './theme';
import { SwI18nModule } from './i18n';
import { SwUiKitsModule } from './ui-kits';
import { SwUtilsModule } from './utils';

@NgModule({
  imports: [CommonModule],
  exports: [
    TranslateModule,
    NgxLoadingModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SwI18nModule,
    SwThemeModule,
    SwUiKitsModule,
    SwUtilsModule
  ]
})
export class SwNgModule {
  static forRoot(): ModuleWithProviders<SwNgModule> {
    return {
      ngModule: SwNgModule,
      providers: [
        SwUtilsModule.forRoot().providers
      ]
    };
  }
}
