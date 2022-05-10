import { ExcelHorizontal, ExcelVertical } from '@shared-lib/common/excel/models/types/excel-types';

export class ExcelOptions {
  horizontal?: ExcelHorizontal;
  vertical?: ExcelVertical;
  bgColor?: string;
  isBorder?: boolean;
  color?: string;
}

