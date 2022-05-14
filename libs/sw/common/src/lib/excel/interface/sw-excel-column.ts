import { SwColumnType } from '../../table/enums/sw-column-type.enum';

export interface SwExcelColumn {
  /**
   * 欄位對應索引(唯一值)
   */
  columnKey: string;

  /**
   * 欄位標題
   */
  title: string;

  /**
   * 欄位類型
   */
  type?: SwColumnType;

}
