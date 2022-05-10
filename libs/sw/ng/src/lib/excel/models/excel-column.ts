import { ColumnType } from '@shared-lib/common/ui-kits/models/enums/column-type.enum';

/**
 * excel 欄位模型
 */
export interface ExcelColumn {
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
  type?: ColumnType;

}
