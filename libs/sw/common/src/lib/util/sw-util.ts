export class SwUtil {

  constructor() {}

  random(length: number, isStillMath = false) {
    let result = '';
    const en = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const math = '0123456789';
    const characters = isStillMath ? math : (math + en);
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
