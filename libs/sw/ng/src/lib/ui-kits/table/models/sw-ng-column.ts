import { SwComponentData } from './sw-component-data';
import { SwColumn } from 'sw-common';

export class SwNgColumn extends SwColumn {

  /**
   * Component 物件，提供動態載入
   * @type {ComponentData}
   */
  componentObject?: SwComponentData;

  constructor(data: SwNgColumn) {
    super(data);
    if (data) {
      this.componentObject = data.componentObject;
    }
  }
}
