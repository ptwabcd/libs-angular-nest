import { SwActionType } from './enums';

export class SwActionItem {
  /**
   * 動作類型
   */
  type: SwActionType;
  /**
   * 說明文字
   * @type {string}
   */
  text: string;
  /**
   * Table 執行此動作後的 Callback
   */
  fn?: (o: any) => any;
  /**
   * 按鈕顏色
   * @type {string}
   */
  color?: string;
  /**
   * icon 名稱
   * @type {string}
   */
  iconName?: string;

  /**
   * 是否顯示(非用於row參數)
   */
  isShow?: boolean;
}
