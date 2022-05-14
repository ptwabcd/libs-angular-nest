import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwConfigModule } from '../config/sw-config.module';
import { SwI18nService } from './services';

@NgModule({
  imports: [
    CommonModule,
    SwConfigModule
  ],
  providers: [SwI18nService]
})
export class SwI18nModule { }
