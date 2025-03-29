import { Record } from "../record";
// eslint-disable-next-line no-unused-vars
import { DateStyles } from "@/utils";
import { DateService } from "../dateService";

/**
 * Banner 單筆資料。
 */
export class BannerRecord extends Record {
  static #props = ["title", "date", "img", "bannerDesc"];

  /**
   * 標題。
   * @type {string}
   */
  title;
  /**
   * 活動日期。
   * @type {string}
   */
  date;
  /**
   * 活動日期，使用月份縮寫格式，參考 {@link DateStyles.dateAbbrMonthYear}。
   * @type {string}
   */
  abbrDate;
  /**
   * 圖片網址。
   * @type {string}
   */
  img;
  /**
   * Banner 內容。
   * @type {string}
   */
  bannerDesc;

  /**
   * Banner 單筆資料。
   * @param {Object} data Event 資料。
   */
  constructor(data) {
    super(data);

    if (data) {
      this._assignData(data, BannerRecord.#props);

      // 格式化的活動日期
      this.abbrDate = DateService.formatAsDateAbbrMonthYear(this.date);
    }
  }
}
