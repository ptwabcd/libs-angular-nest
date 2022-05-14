import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  SwActionType,
  SwAlertType,
  SwColumnType,
  SwCreateArrayType,
  SwDate,
  SwDateType,
  SwOptionalMode,
  SwPagination,
  SwPatternType,
  SwRowStyle,
  SwSortDirection,
  SwTableFooterMode
} from 'sw-common';
import { SwPrintSize } from 'sw-common';


/**
 * 基本 Component 模型:
 * 1.定義公用接口，提供繼承的 Component 被註銷時，實作相關程序。
 */
@Directive({
  selector: '[swBase]'
})
export class SwBaseComponent implements OnDestroy {
  ALL = -1;
  EMPTY = -1;
  TODAY = new Date();
  TODAY_STRING = new SwDate().getDate(false);
  COLUMN_TYPE = SwColumnType;
  OPTIONAL_MODE = SwOptionalMode;
  TABLE_FOOTER_MODE = SwTableFooterMode;
  SORT_DIRECTION = SwSortDirection;
  ALERT_TYPE = SwAlertType;
  ACTION_TYPE = SwActionType;
  PATTERN_TYPE = SwPatternType;
  CREATE_ARRAY_TYPE = SwCreateArrayType;
  DATE_TYPE = SwDateType;
  PRINT_SIZE = SwPrintSize;
  ROW_STYLE = SwRowStyle;
  YEAR = new SwDate().getYear();

  /**
   * 註冊一個可重新發送最後一個元素的屬性，提供 Component Destroy 時使用。
   * 當註銷當前元件時，將發送一個 Boolean 值為 true 提供其他訂閱屬性使用。
   * @example
   * this.route.params.pipe(
   takeUntil(this.destroyed$)
   ).subscribe(....)
   * this.xxx.pipe(takeUntil(this.destroyed$)).subscribe(....)
   */
  protected destroyed$ = new Subject<void>();


  protected defaultDialogConfig = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '60%',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  protected defaultMaxDialogConfig = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '100%',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  protected maxXsDialogConfig = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '600px',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  protected maxSmDialogConfig = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '960px',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  protected maxMdDialogConfig = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '1280px',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  protected defaultAlertDialogConfig = {
    disableClose: true,
    panelClass: 'alert-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '480px',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  protected fullDialogConfig = {
    disableClose: false,
    panelClass: 'custom-full-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '100%',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  protected toolDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    backdropClass: '',
    width: '360px',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  CHANGE_PAGE = (data: Array<{}>, pagination: SwPagination) => data.slice((pagination.currentPage - 1) * pagination.perPage, pagination.currentPage * pagination.perPage);

  /**
   * 實例化 ngOnDestroy，當棄用此 Component 時，取消全部在這裡訂閱的物件
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }


  /**
   * 內容區域，提供將當前內容捲軸移至最上方之方法
   */
  scrollTop() {
    // document.querySelector('.mat-drawer-content').scrollTop = 0;
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

  /**
   * 提供 ngFor 使用預設 track By Index 方法，避免產生多餘 Dom
   * @param index
   * @param item
   * @return {number}
   */
  trackByIndex(index, item) {
    return index;
  }

  scrollTo(elementRef: HTMLTemplateElement | ElementRef | HTMLElement) {
    if (elementRef instanceof ElementRef) {
      elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      elementRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
