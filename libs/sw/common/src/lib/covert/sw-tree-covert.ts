export class SwArrayCovert {

  private readonly _items;

  constructor(items) {
    this._items = items;
  }

  toTree<T>(idKey, parentKey, childrenKey): Array<T> {
    const treeList = [];
    const map = {};
    this._items.forEach(item => {
      map[item[idKey]] = item;
      item[childrenKey] = [];
    });
    this._items.forEach(item => {
      if (item[parentKey] !== null) {
        map[item[parentKey]][childrenKey].push(item);
      } else {
        treeList.push(item);
      }
    });
    return treeList;
  }
}
