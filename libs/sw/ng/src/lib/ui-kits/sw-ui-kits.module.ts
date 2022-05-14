                                                                                                                                       import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwContainerComponent, SwDynamicComponent, SwErrorMessageComponent } from './common';
import { SwTableSerialNumberPipe } from './table';
import { SwUtilsModule } from '../utils/sw-utils.module';


const COMPONENTS = [
  SwContainerComponent,
  SwDynamicComponent,
  SwErrorMessageComponent
];

const PIPES = [
  SwTableSerialNumberPipe,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgxLoadingModule,
    FlexLayoutModule,
    SwUtilsModule
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES
  ]
})
export class SwUiKitsModule { }
