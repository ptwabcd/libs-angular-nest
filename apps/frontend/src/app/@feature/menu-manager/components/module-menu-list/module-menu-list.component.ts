import { Component, OnInit } from '@angular/core';
import { ModuleMenu, ModuleMenuCategory } from '@full-stack/api-interfaces';
import { SwActionType, SwColumnType, SwPagination, SwPaginationRequest, SwStatusData } from 'sw-common';
import { SwResourceResponse, SwResourceResult, SwNgColumn } from 'sw-ng';
import { takeUntil } from 'rxjs/operators';
import { MenuService } from '../../services/menu.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MfcBaseComponent } from '@shared/models/mfc-base-component';
import { ModuleMenuActionsComponent } from '@feature/menu-manager/components/rows-data/module-menu-actions/module-menu-actions.component';

@Component({
  selector: 'manufacture-cloud-module-menu-list',
  templateUrl: './module-menu-list.component.html',
  styleUrls: ['./module-menu-list.component.scss']
})
export class ModuleMenuListComponent extends MfcBaseComponent implements OnInit {
  data$: SwResourceResult<SwResourceResponse<Array<ModuleMenu>>>;
  processObs: SwResourceResult<SwStatusData>;

  columns: Array<SwNgColumn> = [
    {
      columnKey: 'menuTitle',
      title: '選單名稱',
      type: SwColumnType.TEXT,
      isSticky: true,
      width: '200px',
    },
    {
      columnKey: 'menuEnTitle',
      title: '選單英文名稱',
      type: SwColumnType.TEXT
    },
    {
      columnKey: 'menuCategory',
      title: '種類',
      type: SwColumnType.ENUM,
      cellAlign: 'center',
      enumKeys: ModuleMenuCategory
    },
    {
      columnKey: 'menuStatus2',
      title: '選單狀態',
      type: SwColumnType.DYNAMIC_COMPONENT,
      componentObject: {
        component: ModuleMenuActionsComponent
      }
    },
    {
      columnKey: 'menuStatus',
      title: '選單狀態',
      type: SwColumnType.CHECKBOX,
      width: '100px',
      cellAlign: 'center'
    },
    {
      columnKey: 'actions',
      title: '動作',
      type: SwColumnType.ACTIONS,
      width: '130px',
      isStickyEnd: true,
      headerAlign: 'center',
      cellAlign: 'center',
      actions: [
        {
          type: SwActionType.ICON_BUTTON,
          text: '編輯',
          iconName: 'edit',
          color: 'primary',
          fn: (data) => this.openModifyModuleMenuDialog(data)
        },
        {
          type: SwActionType.ICON_BUTTON,
          text: '刪除',
          iconName: 'delete',
          color: 'warn',
          fn: (data) => this.deleteModuleMenu(data.menuId)
        }
      ]
    },
  ];

  rows = new MatTableDataSource<ModuleMenu>();

  paginationRequest: SwPaginationRequest = {
    currentPage: 1,
    perPage: 10,
    sortKey: 'menuId',
    sortDirection: this.SORT_DIRECTION.ASC
  };

  pagination: SwPagination = new SwPagination(this.paginationRequest, 1);

  snackBarVertical: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private menuService: MenuService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.getModuleMenuList();
  }

  getModuleMenuList(pagination: SwPagination = null) {
    this.pagination = pagination ?? this.pagination;
    this.data$ = this.menuService.getMenu(this.pagination, {});
    this.data$.$observable.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.rows = new MatTableDataSource<ModuleMenu>(res.body);
      this.pagination = res.metadata['pagination'];
    });
  }

  openModifyModuleMenuDialog(data: ModuleMenu = null) {

  }

  deleteModuleMenu(menuId: number) {
  }

}
