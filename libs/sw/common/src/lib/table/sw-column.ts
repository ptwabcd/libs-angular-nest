/**
 * Table 欄位模型
 */
import { SwActionItem } from '../util';
import { SwColumnType, SwTableFooterMode } from './enums';

export class SwColumn {
  /**
   * 欄位對應索引(唯一值)
   * @type {string}
   */
  columnKey: string;
  /**
   * 欄位標題
   * @type {string}
   */
  title: string;
  /**
   * 欄位類型
   * @type {ColumnType}
   */
  type: SwColumnType;
  /**
   * 欄位寬度，Ex: 10px or 10%
   * @type {string}
   */
  width?: string;
  /**
   * 欄位前綴文字
   * @type {string}
   */
  prefixText?: string;
  /**
   * 欄位後綴文字
   * @type {string}
   */
  suffixText?: string;
  /**
   * 是否可排序
   * @default false
   * @type {boolean}
   */
  isSortable?: boolean;
  /**
   * 排序對應索引
   * @type {string}
   */
  sortKey?: string;
  /**
   * 排序方向
   * @type {string}
   */
  sortDirection?: string;
  /**
   * 是否可編輯
   * @default false
   * @type {boolean}
   */
  isEditable?: boolean;

  /**
   * table header 位置 ( start | center | end)
   * @default start
   * @type {string}
   */
  headerAlign?: string;
  /**
   * table cell 位置 ( start | center | end)
   * @default start
   * @type {string}
   */
  cellAlign?: string;

  /**
   * 在RWD情境下是否為鎖定的起始欄位
   * @default start
   * @type {string}
   */
  isSticky?: boolean;

  /**
   * 在RWD情境下是否為鎖定的結束欄位
   * @default start
   * @type {string}
   */
  isStickyEnd?: boolean;

  isStickyModeHidden?: boolean;


  /**
   * 欄位為 Link 類型時，提供 Table callback 使用 link function
   * @type {Function}
   */
  link?: (o: any) => any;

  /**
   * 欄位為 action 類型時，提供 Table callback 使用 action 物件內的 function
   * @type {SwActionItem}
   */
  action?: SwActionItem;

  /**
   * 欄位為 actions 類型時，提供 Table callback 使用 action 物件內的 function
   * @type {Array<SwActionItem>}
   */
  actions?: Array<SwActionItem>;

  /**
   * 欄位為 enum 類型時，提供 enum keys
   * @type {Array<SwActionItem>}
   */
  enumKeys?: any;

  // 超過寬度是否顯示...
  isEllipsis?: boolean;

  isDisplay?: boolean;

  isStr2Obj?: boolean;

  footer?: SwTableFooterMode | string;
  footerFn?: () => {};

  /**
   * Table 欄位模型建構子，提供外部可以直接調用 new Column() 建立欄位物件
   * @param {SwColumn} data
   */
  constructor(data: SwColumn = null) {
    if (data) {
      this.columnKey        = data.columnKey;
      this.title            = data.title;
      this.type             = data.type;
      this.width            = data.width;
      this.prefixText       = data.prefixText;
      this.suffixText       = data.suffixText;
      this.isSortable       = data.isSortable;
      this.sortKey          = data.sortKey;
      this.isEditable       = data.isEditable;
      this.sortDirection    = data.sortDirection;
      this.headerAlign      = data.headerAlign;
      this.cellAlign        = data.cellAlign;
      this.isSticky         = data.isSticky;
      this.isStickyEnd      = data.isStickyEnd;
      this.isStickyModeHidden = data.isStickyModeHidden;

      this.link             = data.link;
      this.action           = data.action;
      this.actions          = data.actions;
      this.enumKeys         = data.enumKeys;
      this.isEllipsis       = (data.isEllipsis !== undefined && data.isEllipsis !== null) ? data.isEllipsis : false;
      this.isDisplay        = (data.isDisplay !== undefined && data.isDisplay !== null) ? data.isDisplay : true;
      this.isStr2Obj        = (data.isStr2Obj !== undefined && data.isStr2Obj !== null) ? data.isStr2Obj : false;
      this.footer           = data.footer;
      this.footerFn         = data.footerFn;
    }
  }
}
