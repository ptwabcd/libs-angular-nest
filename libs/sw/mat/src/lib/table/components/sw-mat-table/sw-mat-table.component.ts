import {
  AfterViewInit,
  Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, TemplateRef, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SwBaseComponent, SwNgColumn, SwStr2ObjPipe } from 'sw-ng';
import { SwOptionalMode, SwPagination, SwRowStyle, SwSortDirection } from 'sw-common';
import { SwMatTableGroup } from '../../models/sw-mat-table-group';

/**
 * Table Component，提供全站共同使用此 Component 渲染表格
 *
 * Columns Setting：
 *
 * | Type | 說明 | 必要設定 |
 * | --- | --- | --- |
 * | columnKey | 欄位索引值 | V |
 * | title | 欄位標題 | V |
 * | type | 欄位類型(使用 {@link ColumnType} ) | V |
 * | width | 欄位寬度 | X |
 * | prefixText | 欄位前綴文字 | X |
 * | suffixText | 欄位後綴文字 | X |
 * | isSortable | 是否可排序 | X |
 * | sortKey | 排序對應索引 | X |
 * | sortDirection | 排序方向 | X |
 * | isEditable | 是否可編輯 | X |
 * | isFilterable | 是否可過濾 | X |
 * | headerAlign | table header 位置 ( start, center, end) | X |
 * | cellAlign | table cell 位置 ( start, center, end) | X |
 * | componentObject | Component 物件，提供動態載入 | X |
 * | link | 欄位為 Link 類型時，提供 Table callback 使用 link function | X |
 * | action | 欄位為 action 類型時，提供 Table callback 使用 action 物件內的 function | X |
 * | actions | 欄位為 action 類型時，提供 Table callback 使用 action 物件內的 function | X |
 *
 *
 * Component Setting:
 *
 * | Input | 說明 | 預設值 |
 * | --- | --- | --- |
 * | rows | Table Data Source | 無 |
 * | columns | Table 欄位陣列包含欄位屬性相關設定 | 無 |
 * | template | Table 樣板 | TABLE_TEMPLATE.T_LINE(每列以線條區隔) |
 * | enabledDisplaySerialNumber | 是否開啟 靜態序列數 | 否 |
 * | displaySerialNumberHeaderName | 靜態序列數標題名稱 | # |
 * | isOptional | 是否開啟 Row 選擇 | 否 |
 * | optionalMode | 當開啟 Row 選擇，選擇的模式設定 | TABLE_OPTIONAL_MODE.SINGLE(單選) |
 * | optionalKey | 當開啟 Row 選擇，選擇項與對 Row Data 應的索引 | 無 |
 * | notOptionalValues | 當開啟 Row 選擇，排除可以選擇的項目 | [] |
 * | pagination | 分頁&排序資訊 | 無 |
 * | disabled | 關閉 NgModel 控制項 | 無 |
 * | ngModel or formControl | 雙向綁定已選取資料 | 無 |
 *
 * | Output | 說明 |
 * | --- | --- | --- |
 * | onPaginationChanged | 分頁&排序發生變動時，觸發的 Callback |
 *
 * @example
 * <ehrd-table [rows]="rows"
 * [columns]="columns"
 * [isOptional]="true" [optionalMode]="TABLE_OPTIONAL_MODE.MULTIPLE" [optionalKey]="'synopsisId'"
 * [notOptionalValues]="[1,2,3]"
 * [formControl]="form.get('selected')" >
 * </ehrd-table>
 */
@Component({
  selector: 'sw-mat-table',
  templateUrl: './sw-mat-table.component.html',
  styleUrls: ['./sw-mat-table.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwMatTableComponent),
    multi: true
  }]
})
export class SwMatTableComponent extends SwBaseComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  /**
   * 使用 `Input` 裝飾器，裝飾來源資料屬性
   */
  @Input()
  get rows() {
    return this.staticRows;
  }
  set rows(value) {
    this.staticRows = value;
    this.setGroupData();
    if (value['data'] && value['data'].length >= 0) {
      this.dataResolved = true;
      setTimeout(() => this.calcContainerTableWidth(), 0);
    }
  }

  /**
   * 使用 `Input` 裝飾器，裝飾欄位設定屬性，提供雙向綁定屬性
   */
  @Input()
  get columns() {
    return this.staticColumns;
  }
  set columns(value) {
    this.staticColumns = value;
    this.setOtherColumn();
    setTimeout(() => this.calcContainerTableWidth(), 0);
  }

  /**
   * 使用 `Input` 裝飾器，裝飾 Table 是否開啟 Row 選擇屬性
   */
  @Input() isOptional = false;

  /**
   * 使用 `Input` 裝飾器，裝飾 Table 排除可以選擇的項目屬性
   */
  @Input() notOptionalValues: Array<string | number> = [];

  /**
   * 使用 `Input` 裝飾器，裝飾 Table 選擇模式 屬性
   * @default SwOptionalMode.SINGLE 單選模式
   */
  @Input() optionalMode: SwOptionalMode = SwOptionalMode.SINGLE;

  /**
   * 使用 `Input` 裝飾器，裝飾 Table 選擇項與 Row Data 對應的索引屬性
   */
  @Input() optionalKey: string;

  /**
   * 使用 `Input` 裝飾器，裝飾 Table 是否開啟顯示序列數屬性
   */
  @Input() enabledDisplaySerialNumber: boolean;

  /**
   * 使用 `Input` 裝飾器，裝飾 Table 是否開啟標題列全選屬性
   */
  @Input() enabledMasterToggle = true;

  /**
   * 使用 `Input` 裝飾器，裝飾 Table 選擇項是否為物件
   */
  @Input() isSelectionObject = false;

  /**
   * 使用 `Input` 裝飾器，裝飾 Table 是否開啟顯示序列數標題屬性
   */
  @Input() displaySerialNumberHeaderName = '#';


  /**
   * 使用 `Input` 裝飾器，裝飾 Table Pagination，提供雙向綁定屬性
   */
  @Input()
  get pagination() {
    return this.staticPagination;
  }
  set pagination(value) {
    if (JSON.stringify(this.staticPagination) !== JSON.stringify(value)) {
      this.staticPagination = value;
    }
  }

  /**
   * 使用 `Input` 裝飾器，裝飾 Table 是否關閉 NgModel(formControl)屬性
   */
  @Input() disabled: boolean;

  @Input() expandTemplate: TemplateRef<any>;

  @Input() dataResolved: boolean;

  @Input() dataError: boolean;

  /**
   * 使用 `Input` 裝飾器，裝飾 此table最小寬度屬性
   * @type string
   */
  @Input() minWidth = 280;

  /**
   * 使用 `Input` 裝飾器，裝飾 是否開啟group功能
   */
  @Input() enableDragDrop = false;

  /**
   * 使用 `Input` 裝飾器，裝飾 是否開啟group功能
   */
  @Input() enableGroup = false;

  /**
   * 使用 `Input` 裝飾器，裝飾 group的key
   */
  @Input() groupKey = '';

  /**
   * 使用 `Input` 裝飾器，裝飾 group前綴文字
   */
  @Input() groupPrefixText = '';

  /**
   * 使用 `Input` 裝飾器，裝飾 row 樣式
   */
  @Input() rowStyle: SwRowStyle = SwRowStyle.CROSS;

  /**
   * 使用 `Input` 裝飾器，裝飾 row 樣式
   */
  @Input() bgKey = '';

  /**
   * 使用 `Input` 裝飾器，裝飾 row 樣式
   */
  @Input() colorKey = '';

  /**
   * 使用 `Input` 裝飾器，裝飾 是否開啟column調整功能
   */
  @Input() enableAdjustColumn = false;

  /**
   * 使用 `Input` 裝飾器，裝飾 是否顯示footer
   */
  @Input() isDisplayFooter = false;

  /**
   * 使用 `Output` 裝飾器，裝飾觸發分頁與排序事件屬性
   * @output Pagination
   */
  @Output() onPaginationChanged: EventEmitter<boolean> = new EventEmitter();

  /**
   * 使用 `Output` 裝飾器，裝飾觸發row移動屬性
   * @output Pagination
   */
  @Output() onDropRows: EventEmitter<any> = new EventEmitter();

  tableContainerWidth = 0;
  isStickyTableMode: boolean;

  /**
   * 可以顯示的 Columns 屬性
   */
  displayedColumns: Array<string> = [];

  /**
   * 是否開啟分頁屬性
   */
  enabledPagination: boolean;

  /**
   * 是否有預設排序屬性
   */
  enabledDefaultSorting: boolean;

  /**
   * selection pool，提供選擇的存放池
   */
  selection: SelectionModel<any>;

  /**
   * NgModel on Change 事件
   */
  private onChange: (value) => {};

  /**
   * NgModel on Touched 事件
   */
  private onTouched: () => {};

  /**
   * 提供當前 Component 接收外部 pagination 資料存放
   */
  private staticPagination: SwPagination;

  private staticRows: MatTableDataSource<any>;
  /**
   * 提供當前 Component 接收外部 columns 資料存放
   */
  private staticColumns: Array<SwNgColumn> = [];

  /**
   * 欄位類型可選擇的屬性，不提供外部套件使用
   * @default -1
   * @type {number}
   */
  COLUMNS_TYPE_OPTIONAL = -1;

  /**
   * 欄位類型序號的屬性，不提供外部套件使用
   * @default -2
   * @type {number}
   */
  COLUMNS_TYPE_SERIAL = -2;

  /**
   * 欄位類型的屬性，不提供外部套件使用
   * @default -3
   * @type {number}
   */
  COLUMNS_TYPE_EXPAND = -3;

  @ViewChild('tableContainer') tableContainer: ElementRef;
  @ViewChild('table') table: MatTable<any>;

  @HostListener('window:resize')
  onResize() {
    this.calcContainerTableWidth();
  }


  /**
   * Table Component 建構子，注入所需要物件 or 服務
   * @param {Str2ObjPipe} str2ObjPipe
   * @param {TranslateService} translate
   * @param {MatPaginatorIntl} paginatorIntl
   */
  constructor(
    private str2ObjPipe: SwStr2ObjPipe,
    private translate: TranslateService,
    private paginatorIntl: MatPaginatorIntl
  ) {
    super();
  }

  /**
   * 實例化 ngOnInit，執行此 Component 時，運行初始化程序
   * @return {void}
   */
  ngOnInit() {
    this.setGroupData();
    // Check pagination is enabled
    if (this.pagination) {
      this.enabledPagination = (!!(this.pagination.currentPage) && !!(this.pagination.perPage) && !!(this.pagination.total));
      this.enabledDefaultSorting = !!(this.pagination.sortKey);

      this.paginatorIntl.itemsPerPageLabel = this.translate.instant('EVERY_PAGE_SHOWS');
      this.paginatorIntl.previousPageLabel = this.translate.instant('PREVIOUS_PAGE');
      this.paginatorIntl.nextPageLabel = this.translate.instant('NEXT_PAGE');
    }

    // Remove column type is OPTIONAL,
    this.columns = this.columns.filter((column) => {
      return column.type !== this.COLUMNS_TYPE_OPTIONAL;
    });

    this.setOtherColumn();

    // Prepare Display Columns From columns list
    this.displayedColumns = this.prepareDisplayedColumns(this.columns);

  }

  ngAfterViewInit(): void {
    setTimeout(() => this.calcContainerTableWidth(), 0);
  }

  setOtherColumn() {
    // Check Display SerialNumber is enabled
    if (this.enabledDisplaySerialNumber && !this.columns.map(column => column.columnKey).includes('serialNumber')) {
      this.columns.unshift(new SwNgColumn({
        columnKey: 'serialNumber',
        title: this.displaySerialNumberHeaderName,
        type: this.COLUMNS_TYPE_SERIAL,
        width: '80px',
        isStickyModeHidden: true
      }));
    }

    // Check Optional is enabled
    if (this.isOptional) {
      if (this.optionalKey && !this.columns.map(column => column.columnKey).includes(this.optionalKey)) {
        this.columns.unshift(new SwNgColumn({
          columnKey: this.optionalKey,
          title: this.optionalMode === SwOptionalMode.SINGLE ? this.translate.instant('SELECT') : '',
          type: this.COLUMNS_TYPE_OPTIONAL,
          width: '60px'
        }));
      }

      switch (this.optionalMode) {
        case SwOptionalMode.SINGLE:
          this.selection = new SelectionModel<any>(false, []);
          break;
        case SwOptionalMode.MULTIPLE:
          this.selection = new SelectionModel<any>(true, []);
          break;
      }

      this.selection.changed.pipe(takeUntil(this.destroyed$)).subscribe(() => this.notifyValueChange());
    }

    // Check Display expand icon is enabled
    if (this.expandTemplate) {
      this.columns.unshift(new SwNgColumn({
        columnKey: 'expandIcon',
        title: '',
        type: this.COLUMNS_TYPE_EXPAND,
        width: '50px',
        cellAlign: 'start'
      }));
    }
  }

  /**
   * 全選，
   * @param {string} columnKey
   */
  masterToggle(columnKey: string) {
    if (!this.rows['data']) { return; }
    if (this.isAllSelected(columnKey)) {
      this.rows.connect().subscribe((rows) => {
        rows.forEach((row) => {
          if (!this.isOptionalDisabled(this.str2ObjPipe.transform(row, columnKey))) {
            this.removeSelection(this.str2ObjPipe.transform(row, columnKey));
          }
        });
      });
    } else {
      this.rows.connect().subscribe((rows) => {
        rows.forEach((row) => {
          if (!this.isOptionalDisabled(this.str2ObjPipe.transform(row, columnKey))) {
            this.addSelection(row);
          }
        });
      });
    }
  }

  /**
   * 檢查 selection pool 與 Rows 長度是否一致
   * @param {string} columnKey
   * @return {boolean} 返回是否已全選
   */
  isAllSelected(columnKey: string): boolean {
    const rows = this.rows['data'].filter(item => !this.isGroup(0, item));
    if (!rows) { return false; }
    if (this.selection.isEmpty()) { return false; }
    // 取得當前rows已被選取且不得為disabled的row
    const rowSelected = rows.filter(row => {
      const value = this.str2ObjPipe.transform(row, columnKey);
      return this.isSelected(value) && !this.isOptionalDisabled(value);
    });
    return rowSelected.length === (rows.length - this.notOptionalValues.length);
  }

  /**
   * 檢查可選擇的項目是否包含在排除清單
   * @param {string | number} value
   * @return {boolean} 返回選擇項是否需要被關閉
   */
  isOptionalDisabled(value: string | number): boolean {
    return (this.notOptionalValues.indexOf(value) > this.EMPTY);
  }

  isSelected(value: string) {
    if (this.isSelectionObject && this.optionalMode === SwOptionalMode.MULTIPLE) {
      return this.selection.selected.findIndex(item => item[this.optionalKey] === value) > this.EMPTY;
    } else {
      return this.selection.selected.indexOf(value) > this.EMPTY;
    }
  }

  changeSelection(checked: boolean, row: Object) {
    if (checked) {
      this.addSelection(row);
    } else {
      this.removeSelection(row[this.optionalKey]);
    }
  }


  addSelection(row: Object) {
    if (!this.isSelected(row[this.optionalKey])) {
      (this.isSelectionObject && this.optionalMode === SwOptionalMode.MULTIPLE)
        ?  this.selection.selected.push(row)
        :  this.selection.selected.push(row[this.optionalKey]);
    }
    const selected = this.selection.selected;
    this.selection.clear();
    this.selection.select(...selected);
  }

  removeSelection(value: number) {
    const removeIndex = (this.isSelectionObject && this.optionalMode === SwOptionalMode.MULTIPLE)
      ? this.selection.selected.findIndex(item => item[this.optionalKey] === value)
      : this.selection.selected.indexOf(value);
    this.selection.selected.splice(removeIndex, 1);
    const selected = this.selection.selected;
    this.selection.clear();
    this.selection.select(...selected);
  }

  /**
   * 當 Mat Page 發生變動時，更新 pagination 資料及使用 onPaginationChanged 廣播事件發生
   * @param {PageEvent} event
   */
  pageChanged(event: PageEvent) {
    this.dataResolved = false;
    this.rows['data'] = [];
    this.pagination.currentPage = event.pageIndex + 1;
    this.pagination.perPage = event.pageSize;
    this.onPaginationChanged.emit(true);
  }

  /**
   * 當 Mat Sort 發生變動時，更新 pagination 資料及使用 onPaginationChanged 廣播事件發生
   * @param {PageEvent} event
   */
  sortChanged(event: Sort) {
    this.dataResolved = false;
    this.rows['data'] = [];
    this.pagination.sortKey = event.active;
    this.pagination.sortDirection = event.direction as SwSortDirection;
    this.onPaginationChanged.emit(true);
  }


  /**
   * 通知 NgModel 發生值的變動
   */
  notifyValueChange() {
    if (this.onChange) {
      this.notOptionalValues.forEach(val => {
        const removeIndex = (this.isSelectionObject && this.optionalMode === SwOptionalMode.MULTIPLE)
          ? this.selection.selected.findIndex(item => item[this.optionalKey] === val)
          : this.selection.selected.indexOf(val);
        if ( removeIndex > this.EMPTY ) {
          this.selection.selected.splice(removeIndex, 1);
        }
      });
      switch (this.optionalMode) {
        case SwOptionalMode.SINGLE:
          this.onChange( this.selection.selected[0] ?  this.selection.selected[0] : []);
          break;
        case SwOptionalMode.MULTIPLE:
          this.onChange( this.selection.selected);
          break;
      }
    }
  }

  /**
   * 複寫 NgModel 值
   * @param value
   */
  writeValue(value: any): void {
    if (!value) {
      this.selection.clear();
      this.notifyValueChange();
    } else {
      if (value.length === 0) {
        this.selection.clear();
      }
      switch (this.optionalMode) {
        case SwOptionalMode.SINGLE:
          this.selection.toggle(Array.isArray(value) ? value[0] : value);
          break;
        case SwOptionalMode.MULTIPLE:
          this.selection.select(...value);
          break;
      }
    }

  }

  calcContainerTableWidth() {
    if (this.rows && this.rows['data'] && this.rows['data'].length > 0) {
      if (this.tableContainer) {
        this.tableContainerWidth = (this.tableContainer.nativeElement as HTMLElement).offsetWidth;
        this.isStickyTableMode = (this.tableContainerWidth < this.minWidth);
      }
      this.displayedColumns = this.prepareDisplayedColumns(this.columns);
    }
  }

  /**
   * 註冊 NgModel on Change 事件
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  /**
   * 註冊 NgModel on Touched 事件
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * 設置 NgModel disabled 屬性
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * group
   */
  customFilterPredicate(data: any | SwMatTableGroup): boolean {
    return (data instanceof SwMatTableGroup) ? true : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: any): boolean {
    const groupRows = this.rows['data'].filter(row => row[this.groupKey] && row[this.groupKey] === data[this.groupKey]);
    if (groupRows.length === 0) {
      return true;
    }
    return (groupRows[0] as SwMatTableGroup).expanded;
  }

  addGroups(data: Array<any>, groupKey: string): any[] {
    const removeIndex = [];
    data.forEach((item, index) => {
      if (this.isGroup(0, item)) {
        removeIndex.push(index);
      }
    });
    return this.setGroup(data.filter((item, index) => !removeIndex.includes(index)), groupKey);
  }

  setGroup(data: any[], groupKey: string): any[] {
    const groups = this.uniqueBy(
      data.map(
        row => {
          const result = new SwMatTableGroup();
          result[groupKey] = row[groupKey];
          return result;
        }
      ),
      JSON.stringify);
    let subGroups = [];
    groups.forEach(group => {
      const rowsInGroup = data.filter(row => group[groupKey] === row[groupKey]);
      rowsInGroup.unshift(group);
      subGroups = subGroups.concat(rowsInGroup);
    });
    return subGroups;
  }

  uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index, item): boolean {
    return item instanceof SwMatTableGroup;
  }

  groupHeaderClick(row) {
    row.expanded = !row.expanded;
    this.rows['filter'] = '123';
  }

  setGroupData() {
    if (this.enableGroup && this.rows['data']) {
      this.rows['data'] = this.addGroups(this.rows['data'], this.groupKey);
      this.rows['filterPredicate'] = this.customFilterPredicate.bind(this);
      this.rows['filter'] = '456';
    }
  }

  /**
   * drag and drop
   */
  dropTableRows(event: CdkDragDrop<any, any>) {
    const data = this.rows['data'];
    const prevIndex = data.findIndex(res => res === event.item.data);
    if (this.enableGroup) {
      if (prevIndex > event.currentIndex) {
        data[prevIndex][this.groupKey] = data[(event.currentIndex - 1) <= 0 ? 0 : (event.currentIndex - 1)][this.groupKey];
      } else {
        data[prevIndex][this.groupKey] = data[event.currentIndex][this.groupKey];
      }
    }
    moveItemInArray(this.rows['data'], prevIndex, event.currentIndex);
    if (this.enableGroup) {
      this.setGroupData();
    } else {
      this.table.renderRows();
    }
    this.onDropRows.emit(event.item.data);
  }

  drop(displayedColumns: Array<string> = null) {
    setTimeout(() => {
      const columns: Array<SwNgColumn> = [];
      this.displayedColumns = displayedColumns;
      displayedColumns.forEach(key => columns.push(this.columns.find(item => item.columnKey === key)));
      this.columns = columns;
    }, 0);
  }



  empty() {
    this.rows['data'] = [];
  }

  reload() {
    this.calcContainerTableWidth();
  }

  /**
   * 準備需要顯示之欄位
   * @param {Array<Column>} columns
   * @return {Array<string>}x
   */
  private prepareDisplayedColumns(columns: Array<SwNgColumn>): Array<string> {
    return columns.filter((column) => {
      return (this.isOptional) ? column : (column.type !== this.COLUMNS_TYPE_OPTIONAL);
    }).filter(column => !column.isStickyModeHidden || !this.isStickyTableMode)
      .map(item => new SwNgColumn(item))
      .filter(column => column.isDisplay !== false)
      .map((column) => column.columnKey);
  }
}
