export class SwMatItemNode {
  id: number;
  item: string;
  children: SwMatItemNode[];
  parentId?: number;
  isExpend?: boolean;
  expandable?: boolean;

  constructor(data: SwMatItemNode = null) {
    this.id = data.id;
    this.item = data.item;
    this.children = data.children;
    this.parentId = data.parentId;
    this.isExpend = data.isExpend;
    this.expandable = data.expandable;
  }
}
