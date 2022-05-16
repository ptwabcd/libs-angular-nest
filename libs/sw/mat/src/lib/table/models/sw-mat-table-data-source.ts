import { DataSource } from '@angular/cdk/collections';
import { Observable ,  of } from 'rxjs';

/**
 * Mat Table Data Source 模型
 * @extends DataSource
 */
export class SwMatTableDataSource<R> extends DataSource<R> {

  /**
   * 繼承 connect method
   * @return {Observable<R[]>}
   */
  connect(): Observable<R[]> {
    return of(this.data);
  }

  /**
   * 繼承 disconnect method
   */
  disconnect() {}

  /**
   * Mat Table Data Source 建構子，提供外部可以直接使用 new MatTableDataSource<R>() 建立物件
   * @param data
   */
  constructor(
    private data: any = null
  ) {
    super();
  }
}
