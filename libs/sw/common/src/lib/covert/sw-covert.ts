export class SwCovert {

  private readonly _value;

  constructor(value) {
    this._value = value;
  }

  enum2Array(): Array<string> {
    return Object
      .keys(this._value)
      .filter(key => isNaN(Number(key)))
      .map(key => this._value[key]);
  }

  toBoolean(): boolean {
    return this._value === 'true' || this._value === true || this._value === 1;
  }

  toArray() {
    return typeof this._value === 'string' ? [this._value] : this._value;
  }

  toNumber(nullValue = null) {
    return (this._value === 'null' || this._value === null || this._value === undefined || this._value === 'undefined') ? nullValue : Number(this._value);
  }

  toDate(nullValue = null) {
    return (this._value === 'null' || this._value === null || this._value === undefined || this._value === 'undefined') ? nullValue : new Date(this._value);
  }

  toValue(nullValue = null): any {
    return (this._value === 'null' || this._value === null || this._value === undefined || this._value === 'undefined') ? nullValue : this._value;
  }

  serialNumber(length: number) {
    const numberString = this._value.toString();
    const zeroCount = (numberString.length >= length) ? '' : (length - numberString.length);
    const prefix = zeroCount ? Array.from(Array(zeroCount).keys()).reduce((sum) => sum + '0', '') : '';
    return `${prefix}${numberString}`;
  }

  objToXml(obj: object): string {
    return Object.keys(obj).reduce((result, key) => {
      const value = obj[key] || '';
      if (Array.isArray(value)) {
        return result + value.reduce((arrResult, arr) =>
          arrResult + `<${key}>${typeof arr === 'object' ? this.objToXml(arr) : (arr || '')}</${key}>`, '');
      }
      if (typeof value === 'object') {
        return result + `<${key}>${this.objToXml(value)}</${key}>`;
      }
      return result + `<${key}>${value}</${key}>`;
    }, '');
  }

  getXmlValue (str, key) {
    return str.substring(
      str.lastIndexOf('<' + key + '>') + ('<' + key + '>').length,
      str.lastIndexOf('</' + key + '>')
    );
  }
}
