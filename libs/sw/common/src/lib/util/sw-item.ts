export class SwItem {
  title: string;
  value: string | boolean | number;

  constructor(data: SwItem = null) {
    Object.assign(this, data);
  }
}
