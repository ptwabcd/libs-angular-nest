import { InjectionToken, Provider } from '@angular/core';

/**
 * Component 資料模型，提供動態載入時使用
 */
export class SwComponentData {
  /**
   * component class
   */
  component: any;
  /**
   * 建立動態 component，提供資料傳遞的 InjectionToken
   * @deprecated this type is old solution
   */
  dataInjectionToken?: InjectionToken<String>;
  /**
   * component data
   * @deprecated this type is old solution
   */
  data?: any;
  /**
   * 動態 component，可接收資料屬性
   */
  inputData?: { [key: string]: any };
  /**
   * 動態 component，輸出事件屬性
   */
  outputData?: { [key: string]: Function };
  /**
   * component 所需要的 provider 物件
   */
  providers?: Array<Provider>;
}
