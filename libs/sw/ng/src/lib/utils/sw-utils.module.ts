import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SwAdditionPipe, SwBooleanToYesNoPipe, SwContentToNoDataPipe,
  SwCreateArrayPipe, SwDatePipe, SwDivisionPipe,
  SwEnum2ItemPipe,
  SwFileSizePipe, SwFindTreeByIdPipe, SwGenderPipe, SwGroupToArrayPipe,
  SwHtmlEscapePipe, SwImgPathPipe,
  SwIsArraySamePipe, SwIsFaIconPipe,
  SwIsNullOrUndefinedPipe,
  SwIsObjectEmptyPipe, SwListToTreePipe, SwMultiplicationPipe,
  SwNl2BrPipe,
  SwObj2ComponentDataPipe, SwObjToKeysPipe,
  SwRoundPipe, SwShorthandPipe,
  SwStr2ObjPipe, SwSubtractionPipe, SwSumPipe, SwToNumberPipe, SwTreeToListPipe,
  SwTrustResourceUrlPipe, SwTrustStylePipe
} from './pipes';
import {
  SwCounterDirective,
  SwCurrentPageDirective,
  SwInputPatternDirective,
  SwSwitchCasesDirective, SwVarDirective
} from './directives';

const PIPES = [
  SwStr2ObjPipe,
  SwNl2BrPipe,
  SwCreateArrayPipe,
  SwObj2ComponentDataPipe,
  SwTrustResourceUrlPipe,
  SwHtmlEscapePipe,
  SwFileSizePipe,
  SwIsNullOrUndefinedPipe,
  SwEnum2ItemPipe,
  SwShorthandPipe,
  SwIsArraySamePipe,
  SwGroupToArrayPipe,
  SwIsObjectEmptyPipe,
  SwRoundPipe,
  SwAdditionPipe,
  SwSubtractionPipe,
  SwMultiplicationPipe,
  SwDivisionPipe,
  SwTreeToListPipe,
  SwListToTreePipe,
  SwTrustStylePipe,
  SwFindTreeByIdPipe,
  SwIsFaIconPipe,
  SwGenderPipe,
  SwBooleanToYesNoPipe,
  SwContentToNoDataPipe,
  SwImgPathPipe,
  SwDatePipe,
  SwToNumberPipe,
  SwObjToKeysPipe,
  SwSumPipe
];

const DIRECTIVES = [
  SwInputPatternDirective,
  SwSwitchCasesDirective,
  SwCurrentPageDirective,
  SwCounterDirective,
  SwVarDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...PIPES,
    ...DIRECTIVES
  ],
  exports: [
    ...PIPES,
    ...DIRECTIVES
  ]
})
export class SwUtilsModule {
  static forRoot(): ModuleWithProviders<SwUtilsModule> {
    return {
      ngModule: SwUtilsModule,
      providers: [
        ...PIPES
      ]
    };
  }
}
