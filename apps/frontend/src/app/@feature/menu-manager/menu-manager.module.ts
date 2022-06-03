import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleMenuListComponent } from './components/module-menu-list/module-menu-list.component';
import { SharedModule } from '@shared/shared.module';
import { ModuleMenuActionsComponent } from './components/rows-data/module-menu-actions/module-menu-actions.component';


@NgModule({
  declarations: [
    ModuleMenuListComponent,
    ModuleMenuActionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ModuleMenuListComponent,
    ModuleMenuActionsComponent
  ]
})
export class MenuManagerModule { }
