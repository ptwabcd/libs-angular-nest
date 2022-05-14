import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  SwConfigHttpLoader,
  SwConfigLoader,
  SwConfigMergeLoader,
  SwConfigModule,
  SwNgModule,
  SwTranslateHttpLoaders
} from 'sw-ng';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@angular/flex-layout';

// config
export function configFactory(http: HttpClient): SwConfigLoader {
  const system = new SwConfigHttpLoader(http, './assets/configs/system.json'); // API ENDPOINT (local)
  const security = new SwConfigHttpLoader(http, './assets/configs/security.json'); // API ENDPOINT (local)

  return new SwConfigMergeLoader([ system, security ]); // PARALLEL EXECUTION
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new SwTranslateHttpLoaders(httpClient, [
    { prefix: './libs/sw/ng/src/assets/i18n/', suffix: '.json' },
    { prefix: './assets/i18n/', suffix: '.json' },
  ]);
}


@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '0px',
      primaryColour: '#56bca8',
      secondaryColour: '#5182bc',
      tertiaryColour: '#56bca8'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SwNgModule.forRoot(),
    SwConfigModule.forRoot({
      provide: SwConfigLoader,
      useFactory: (configFactory),
      deps: [HttpClient]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
