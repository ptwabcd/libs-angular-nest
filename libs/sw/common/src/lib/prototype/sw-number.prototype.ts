export class NumberPrototype extends Number {

  /**
   ** 加法函數，用來得到精確的加法結果
   ** 說明：javascript的加法結果會有誤差，在兩個浮點數相加的時候會比較明顯。這個函數返回較為精確的加法結果。
   ** 調用：addition(arg1,arg2)
   ** 返回值：arg1加上arg2的精確結果
   **/
  static addition(arg1, arg2): number {
    let r1, r2, m, c;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      const cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', '')) * cm;
      } else {
        arg1 = Number(arg1.toString().replace('.', '')) * cm;
        arg2 = Number(arg2.toString().replace('.', ''));
      }
    } else {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', ''));
    }

    return (arg1 + arg2) / m;
  }


  /**
   ** 減法函數，用來得到精確的減法結果
   ** 說明：javascript的減法結果會有誤差，在兩個浮點數相減的時候會比較明顯。這個函數返回較為精確的減法結果。
   ** 調用：subtraction(arg1,arg2)
   ** 返回值：arg1加上arg2的精確結果
   **/
  static subtraction(arg1, arg2): number {
    let r1, r2, m, n;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka, 動態控制精度長度
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
  }


  /**
   ** 乘法函數，用來得到精確的乘法結果
   ** 說明：javascript的乘法結果會有誤差，在兩個浮點數相乘的時候會比較明顯。這個函數返回較為精確的乘法結果。
   ** 調用：multiplication(arg1,arg2)
   ** 返回值：arg1乘以 arg2的精確結果
   **/
  static multiplication(arg1, arg2): number {
    let m = 0;
    const s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {
    }
    try {
      m += s2.split('.')[1].length;
    } catch (e) {
    }

    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  }


  /**
   ** 除法函數，用來得到精確的除法結果
   ** 說明：javascript的除法結果會有誤差，在兩個浮點數相除的時候會比較明顯。這個函數返回較為精確的除法結果。
   ** 調用：division(arg1,arg2)
   ** 返回值：arg1除以arg2的精確結果
   **/
  static division(arg1, arg2): number {
    let t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
    }

    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  }
}
