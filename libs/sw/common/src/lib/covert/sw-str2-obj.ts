export class SwStr2Obj {

  transform(obj: object, str?: string, split: string = '.'): any {
    const keys = str.split(split);
    keys.forEach((key) => obj = obj[key]);
    return obj;
  }
}
