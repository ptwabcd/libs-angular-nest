import * as moment from 'moment';
import Diff = moment.unitOfTime.Diff;
import { unitOfTime } from 'moment';
import { SwTimeRange } from './sw-time-trange';

export class SwDate {

  YEAR_FORMAT = 'YYYY';
  YEAR_SHORTHAND_FORMAT = 'YY';
  MONTH_FORMAT = 'MM';
  DAY_FORMAT = 'DD';
  HOUR_FORMAT = 'HH';
  MINUTE_FORMAT = 'mm';
  SECOND_FORMAT = 'ss';
  YEAR_MONTH_FORMAT = `${this.YEAR_FORMAT}/${this.MONTH_FORMAT}`;
  DATE_FORMAT = `${this.YEAR_FORMAT}/${this.MONTH_FORMAT}/${this.DAY_FORMAT}`;
  HOUR_MINUTE_FORMAT = `${this.HOUR_FORMAT}:${this.MINUTE_FORMAT}`;
  TIME_FORMAT = `${this.HOUR_MINUTE_FORMAT}:${this.SECOND_FORMAT}`;
  DATETIME_FORMAT = `${this.DATE_FORMAT} ${this.TIME_FORMAT}`;
  DATE_STRING = `${this.YEAR_FORMAT}${this.MONTH_FORMAT}${this.DAY_FORMAT}`;
  DATETIME_STRING = `${this.DATE_STRING}${this.HOUR_FORMAT}${this.MINUTE_FORMAT}${this.SECOND_FORMAT}`;
  CHINESE_FORMAT = `YYYY年${this.MONTH_FORMAT}月${this.DAY_FORMAT}日`;

  format(date = new Date(), format) {
    moment(date).format(format);
  }

  covertDate(date: string | Date) {
    return typeof date === 'string' ? new Date(date) : date;
  }

  getYear(date = new Date(), isShorthand = false): string {
    return moment(date).format((isShorthand) ? this.YEAR_SHORTHAND_FORMAT : this.YEAR_FORMAT);
  }

  getMonth(date = new Date(), move: number = null): string {
    if (move === null) {
      return moment(date).format(this.MONTH_FORMAT);
    } else {
      return moment().subtract(move, 'months').format(this.MONTH_FORMAT);
    }
  }

  getYearMonth(date = new Date(), move: number = null) {
    if (move === null) {
      return moment(date).format(this.YEAR_MONTH_FORMAT);
    } else {
      return moment(date).subtract(move, 'months').format(this.YEAR_MONTH_FORMAT);
    }
  }

  getDay(date = new Date()): string {
    return moment(date).format(this.DAY_FORMAT);
  }

  getTime(date = new Date(), isShort = false): string {
    return moment(date).format(isShort ? this.HOUR_MINUTE_FORMAT : this.TIME_FORMAT);
  }

  getNowDaysInMonth(): number {
    return moment().daysInMonth();
  }

  getDate(isDateTime = true, date: string | Date = new Date(), isTaiwanYear = false, isChineseFormat = false): string {
    if (date) {
      date = typeof date === 'string' ? new Date(date) : date;
      const deductYear = isTaiwanYear ? 1911 : 0;
      const format = isChineseFormat
        ? this.CHINESE_FORMAT
        : isDateTime
          ? this.DATETIME_FORMAT
          :  this.DATE_FORMAT;
      const result = moment(date).set('year', date.getFullYear() - deductYear).format(format);
      return isTaiwanYear ? result.substr(1) : result;
    } else {
      return '';
    }
  }

  endOf(date = new Date()) {
    return moment(date).endOf('day').format(this.DATETIME_FORMAT);
  }

  getHour(date = new Date()): string {
    return moment(date).format(this.HOUR_FORMAT);
  }

  getMinute(date = new Date()): string {
    return moment(date).format(this.MINUTE_FORMAT);
  }

  getSecond(date = new Date()): string {
    return moment(date).format(this.SECOND_FORMAT);
  }

  getDateString(date = new Date()): string {
    return moment(date).format(this.DATE_STRING);
  }

  getDatetimeString(date = new Date()): string {
    return moment(date).format(this.DATETIME_STRING);
  }

  getTimestamp(date = new Date()) {
    return moment(date).unix();
  }

  getNow() {
    return new Date(moment().format(this.DATETIME_FORMAT));
  }

  diffMinute(startTime: Date, endTime: Date): number {
    return moment(endTime, this.HOUR_MINUTE_FORMAT).diff(moment(startTime, this.HOUR_MINUTE_FORMAT), 'minutes');
  }

  diff(startDate: Date | string, endDate: Date | string, unitOfTime: Diff = 'days'): number {
    return moment(this.covertDate(endDate)).diff(moment(this.covertDate(startDate)), unitOfTime);
  }

  getDateSerialNumber(serialNumber: string = (Math.round(Math.random() * 23 + 1000)).toString(), isShowTime = false) {
    const time = isShowTime ? `${this.getHour()}${this.getMinute()}${this.getSecond()}` : '';
    return `${this.getYear()}${this.getMonth()}${this.getDay()}${time}${serialNumber}`;
  }

  isSame(date1: Date | string, date2: Date | string = new Date(), granularity: unitOfTime.StartOf = 'day'): boolean {
    return moment(this.covertDate(date1)).isSame(this.covertDate(date2), granularity);
  }

  isBetweenNow(date: Date = new Date(), date1: Date | string, date2: Date | string = new Date()) {
    return moment(date).isBetween(date1, date2);
  }

  isBetween(date: Date | string = new Date(), date1: Date | string, date2: Date | string = new Date()) {
    return moment(date).isBetween(date1, date2, 'day', '[]');
  }

  isBetweenHour(date: Date | string = new Date(), startTime: string, endTime: string) {
    return moment(date, this.TIME_FORMAT).isBetween(moment(startTime, this.TIME_FORMAT), moment(endTime, this.TIME_FORMAT), 'hour', '[]');
  }

  isBefore(date1: Date | string, date2: Date | string = new Date(), isSame = false): boolean {
    if (isSame) {
      return moment(date1).isSameOrBefore(date2, 'days');
    } else {
      return moment(date1).isBefore(date2, 'days');
    }
  }

  isAfter(date1: Date | string, date2: Date | string = new Date(), isSame = false): boolean {
    if (isSame) {
      return moment(date1).isSameOrAfter(date2, 'days');
    } else {
      return moment(date1).isAfter(date2, 'days');
    }
  }

  betweenMap(startDate: Date, endDate: Date) {
    const result = [];
    while (startDate < endDate) {
      result.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    return result;
  }

  add(date: Date, amount: number, unit: unitOfTime.DurationConstructor = 'days'): Date {
    return new Date(moment(date).add(amount, unit).format(this.DATE_FORMAT));
  }

  addDate(amount: number): Date {
    return new Date(moment(new Date()).add(amount, 'days').format(this.DATE_FORMAT));
  }

  addYear(date: Date = new Date(), amount: number): Date {
    return new Date(moment(date).add(amount, 'years').format(this.DATE_FORMAT));
  }

  addHour(date: Date, amount: number): Date {
    return new Date(moment(date).add(amount, 'hours').format(this.DATETIME_FORMAT));
  }

  /**
   * 取得前幾個月的日期
   */
  diffMonth(date: Date, month: number): string {
    return moment(date).subtract(month, 'months').format(this.DATE_FORMAT);
  }

  diffDay(startDate: Date, endDate: Date) {
    return moment(startDate).diff(moment(endDate), 'days');
  }

  diffYear(startDate: Date, endDate: Date) {
    return moment(startDate).diff(moment(endDate), 'years');
  }

  diffHour(startTime: string, endTime: string) {
    return moment(startTime, this.TIME_FORMAT).diff(moment(endTime, this.TIME_FORMAT), 'hours');
  }

  getDayName(date: Date | string): string {
    return moment(date).locale('zh-tw').format('dddd');
  }

  getDayNumber(date: Date | string): number {
    return moment(date).day();
  }

  getTaiwanYear(date = new Date()): number {
    return Number(this.getYear(date)) - 1911;
  }

  getTaiwanContinueDay(date = new Date()): string {
    return `${this.getTaiwanYear(date)}${moment(date).format(this.MONTH_FORMAT + this.DAY_FORMAT)}`;
  }

  isValid(date: string | Date): boolean {
    return moment(date).isValid();
  }

  minutesToHours(seconds: number): number {
    return Number(moment.duration(seconds, 'minutes').asHours().toFixed(2));
  }

  monthToDoubleDigit(month: number): string {
    return month < 10 ? `0${month}` : `${month}`;
  }

  getMonthRange(date: string | Date): { startDate: string, endDate: string } {
    date = typeof date === 'string' ? new Date(date) : date;
    const startDate = moment(date).startOf('month').format(this.DATE_FORMAT);
    const endDate = moment(date).endOf('month').format(this.DATE_FORMAT);
    return { startDate, endDate };
  }

  utc(date: string | Date): number {
    date = typeof date === 'string' ? new Date(date) : date;
    return  moment(date).utc(true).valueOf();
  }

  subtractDate(amount: number, date = new Date()): Date {
    return new Date(moment(date).subtract(amount, 'days').format(this.DATE_FORMAT));
  }

  dateStringToDate(dateString: string, isDateTime = false) {
    return dateString ? moment(dateString, this.DATE_STRING).format(isDateTime ? this.DATETIME_FORMAT :  this.DATE_FORMAT) : '';
  }

  endMonth(date = new Date(), format = this.DATE_FORMAT) {
    return moment(date).endOf('month').format(format);
  }

  timeRangeToString(timeRange: SwTimeRange) {
    return `${timeRange.startHour}:${timeRange.startMinute}~${timeRange.endHour}:${timeRange.endMinute}`;
  }

  splitTimeRange(timeRange: string) {
    const timeRanges = timeRange.split('~');
    const startHourMinutes = timeRanges[0].split(':');
    const endHourMinutes = timeRanges[1].split(':');
    return {
      startHour: startHourMinutes[0],
      startMinute: startHourMinutes[1],
      endHour: endHourMinutes[0],
      endMinute: endHourMinutes[1]
    };
  }

}
