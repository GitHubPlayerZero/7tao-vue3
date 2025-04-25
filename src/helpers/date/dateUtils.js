import { DateStyles } from "./dateStyles";

/**
 * 日期時間處理工具
 */
export class DateUtils {
  /**
   * 將月或日前方補 0 至兩碼。
   * @param {number} num
   * @returns {string} 補滿兩碼的字串。
   */
  static #fill(num) {
    return String(num).padStart(2, "0");
  }

  /**
   * 是否為 Date 物件？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 為 Date 物件回傳 true，否則回傳 false。
   */
  static isDate(val) {
    return val instanceof Date;
  }

  /**
   * 是否可以轉為日期？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 可以轉為日期回傳 true，否則回傳 false。
   */
  static canBeDate(val) {
    return !Number.isNaN(Date.parse(val));
  }

  /**
   * 轉換成 Date 物件。
   * @param {*} val 要轉成 Date 物件的值。
   * @returns Date 物件。
   * @throws 若不是正常的日期格式則拋出錯誤訊息。
   */
  static convertToDate(val) {
    // 本身即為日期
    if (this.isDate(val)) {
      return val;
    }
    // 可以轉為日期
    else if (this.canBeDate(val)) {
      return new Date(val);
    }
    // 錯誤
    else {
      throw TypeError(`${val} 為不正確的日期格式！`);
    }
  }

  /**
   * 取得月份縮寫。
   * @param {number} month 月份，例如 1 月傳入 1，12 月傳入 12。
   * @returns {string} 月份縮寫。
   */
  static getMonthAbbrByMonth(month) {
    return DateStyles.monthAbbr[month - 1];
  }

  /**
   * 取得月份縮寫。
   * @param {Date|string|number} date 日期，會經過轉換，所以可以是 Date 物件、日期字串、timestamp。
   * @returns {string} 月份縮寫。
   * @throws 若不是正常的日期格式則拋出錯誤訊息。
   */
  static getMonthAbbrByDate(date) {
    date = this.convertToDate(date);
    return DateStyles.monthAbbr[date.getMonth()];
  }

  /**
   * 日期加減天數。
   * @param {Date|string|number} date 日期，會經過轉換，所以可以是 Date 物件、日期字串、timestamp。
   * @param {number} [dayNum = 0] 要加減的天數，若為「減」須傳入「負數」。可選，預設為 0。
   * @returns {Date} 處理完成的日期物件。
   * @throws 若不是正常的日期格式則拋出錯誤訊息。
   */
  static countDate(date, dayNum = 0) {
    date = this.convertToDate(date);
    date.setDate(date.getDate() + dayNum);
    return date;
  }

  /**
   * 依據指定的樣式格式化日期。
   * @param {Date|string|number} date 日期，會經過轉換，所以可以是 Date 物件、日期字串、timestamp。
   * @param {string} [style = DateStyles.yyyymmddSlash] 格式化的樣式，可選，預設為 {@link DateStyles.yyyymmddSlash}。
   * @returns {string} 格式化後的日期字串。
   * @throws 若不是正常的日期格式會拋出錯誤訊息。
   */
  static formatDate(date, style = DateStyles.yyyymmddSlash) {
    date = this.convertToDate(date);

    return style
      .replace("[YYYY]", date.getFullYear())
      .replace("[MM]", this.#fill(date.getMonth() + 1))
      .replace("[DD]", this.#fill(date.getDate()))
      .replace("[M]", date.getMonth() + 1)
      .replace("[D]", date.getDate())
      .replace("[AbbrM]", this.getMonthAbbrByDate(date));
  }

  /**
   * 取得系統日期，可以指定格式化的樣式。
   * @param {string} [style = DateStyles.yyyymmddSlash] 格式化的樣式，可選，預設為 {@link DateStyles.yyyymmddSlash}。
   * @returns {string} 格式化後的日期字串。
   */
  static getSysDate(style = DateStyles.yyyymmddSlash) {
    return this.formatDate(new Date(), style);
  }

  /**
   * 取得明天的日期，可以指定格式化的樣式。
   * @param {string} [style = DateStyles.yyyymmddSlash] 格式化的樣式，可選，預設為 {@link DateStyles.yyyymmddSlash}。
   * @returns {string} 格式化後的日期字串。
   */
  static getTomorrow(style = DateStyles.yyyymmddSlash) {
    return this.formatDate(this.countDate(new Date(), 1), style);
  }
}
