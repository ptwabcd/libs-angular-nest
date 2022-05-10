import { Injectable } from '@angular/core';
import { Column } from '@shared-lib/common/ui-kits/models/table/column';
import { ColumnType } from '@shared-lib/common/ui-kits/models/enums/column-type.enum';
import { ExcelColumn } from '../models/excel-column';
import { saveAs } from 'file-saver';
import { Str2ObjPipe } from '../../utils/pipes/convert/str2-obj.pipe';
import { CellValue, Workbook, Worksheet } from 'exceljs';
import { Observable } from 'rxjs';
import { ExcelOptions } from '@shared-lib/common/excel/models/excel-options';
import { DecimalPipe } from '@angular/common';

@Injectable()
export class ExcelService {
  workbook: Workbook;
  worksheet: Worksheet;
  constructor(
    private decimalPipe: DecimalPipe,
    private str2ObjPipe: Str2ObjPipe
  ) { }

  create(isReset = true) {
    if (isReset) {
      this.workbook = new Workbook();
    }
    this.worksheet = this.workbook.addWorksheet('data');
  }

  setWidth(width: number) {
    this.worksheet.columns.forEach(column => column.width = width);
  }

  merge(rowStart, cellStart, rowEnd, cellEnd) {
    this.worksheet.mergeCells(rowStart, cellStart, rowEnd, cellEnd);
  }

  addRow(text: Array<string>, options?: ExcelOptions) {
    const row = this.worksheet.addRow(text);
    const vertical = options?.vertical ? options.vertical : 'middle';
    const horizontal = options?.horizontal ? options.horizontal : 'left';
    const bgColor = options?.bgColor ? options.bgColor : null;
    const isBorder = options?.isBorder ? options.isBorder : false;
    const color = options?.color ? options.color : '000000';
    row.alignment = { vertical, horizontal, wrapText: false };
    row.font = {
      color: {
        argb: color
      },
      size: 10
    };
    row.eachCell({ includeEmpty: true }, cell => {
      if (bgColor) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: bgColor },
          bgColor: { argb: bgColor },
        };
      }
      if (isBorder) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      }
    });
    return row;
  }

  addData(excelColumns: Array<ExcelColumn>, dataSource: Array<Object>) {
    this.addRow(excelColumns.map(column => column.title));
    dataSource.map((data) => {
      const rowArray = [];
      excelColumns.forEach((column) => rowArray.push(this.str2ObjPipe.transform(data, column.columnKey)));
      this.worksheet.addRow(rowArray);
    });
  }

  export(fileName: string) {
    this.exportXLSX(this.workbook, fileName);
  }


  exportXLSXByTable(fileName: string, headers: Array<Column>, dataSource: Array<Object>) {
    const excelColumns = headers.filter(
      header => header.type !== ColumnType.ACTION && header.type !== ColumnType.ACTIONS && header.columnKey !== 'action'  && header.columnKey !== 'actions'
    ).map(header => {
      return {
        columnKey: header.columnKey,
        title: header.title,
        type:  header?.type ? header.type : ColumnType.TEXT
      };
    });
    this.exportXLSX(this.dataSourceCovertToExcel(excelColumns, dataSource), fileName);
  }


  dataSourceCovertToExcel(excelColumns: Array<ExcelColumn>, dataSource: Array<Object>): Workbook {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('data');
    worksheet.addRow(excelColumns.map(column => column.title));
    dataSource.map((data) => {
      const rowArray = [];
      excelColumns.forEach((column) => {
        let row = this.str2ObjPipe.transform(data, column.columnKey);
        if (column.type === ColumnType.NUMBER) {
          row = this.decimalPipe.transform(row);
        }
        rowArray.push(row);
      });
      worksheet.addRow(rowArray);
    });
    return workbook;
  }

  exportXLSX(workbook: Workbook, fileName: string) {
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${fileName}.xlsx`);
    });
  }

  import<T>(columns: Array<ExcelColumn>, event): Observable<Array<T>> {
    const workbook = new Workbook();
    const _column: Array<ExcelColumn & { cellIndex: number }> = [];
    const target: DataTransfer = <DataTransfer> (event.target);
    return new Observable<Array<T>>(observer => {
      new Response(target.files[0]).arrayBuffer().then((data) => {
        const result = [];
        workbook.xlsx.load(data).then( () => {
          const worksheet = workbook.getWorksheet(1);
          worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if (rowNumber === 1) {
              row.eachCell((cell, cellIndex) => {
                const index = columns.findIndex(column => column.columnKey === cell.value || column.title === cell.value);
                if (index > -1) {
                  _column.push({...columns[index], cellIndex});
                }
              });
            } else {
              if (_column.map(column => column.cellIndex).some(cellIndex => row.getCell(cellIndex).value !== null)) {
                result[rowNumber - 2] = {};
                _column.forEach((column) => {
                  const cellValue: CellValue = row.getCell(column.cellIndex).value;
                  result[rowNumber - 2][column.columnKey] = (cellValue && (cellValue['formula'] || cellValue['sharedFormula'])) ? cellValue['result'] : cellValue;
                });
              }
            }
          });
          observer.next(result);
          observer.complete();
        });
      });
    });

  }
}
