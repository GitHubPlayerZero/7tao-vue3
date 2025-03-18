import { DateStyles, DateUtils } from "@/utils";

/**
 * 日期處理
 */
export class DateService {
  /**
   * 格式化為 {@link DateStyles.dateAbbrMonthYear}。
   * @param {Date|string|number} date 日期，可以是 Date 物件、日期字串、timestamp。
   * @returns {string} 格式化後的日期字串。
   * @throws 若不是正常的日期格式會拋出錯誤訊息。
   */
  static formatAsDateAbbrMonthYear(date) {
    return DateUtils.formatDate(date, DateStyles.dateAbbrMonthYear);
  }
}
