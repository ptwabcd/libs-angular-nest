import { SwMaterialIconType } from './enums/sw-mat-icon-type.enum';

export class SwMatIconCategories {
  categories: Array<{
    name: SwMaterialIconType;
    key: string;
    icons: Array<{
      id: string;
      name: string,
      group_id: string,
      keywords: Array<string>,
      ligature: string,
      codepoint: string
    }>;
  }>;
}
