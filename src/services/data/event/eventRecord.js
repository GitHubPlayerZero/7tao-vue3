import { Record } from "../record";
import { DateService } from "@/services/dateService";

/**
 * Event 單筆資料。
 */
export class EventRecord extends Record {
  static #props = [
    "date",
    "title",
    "subTitle",
    "opening",
    "desc",
    "img",
    "tags",
    "isOnSale",
    "isBanner",
    "bannerDesc",
  ];

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
   * 標題。
   * @type {string}
   */
  title;

  /**
   * 子標題。
   * @type {string}
   */
  subTitle;

  /**
   * 開場白。
   * @type {string}
   */
  opening;

  /**
   * 內容說明。
   * @type {string}
   */
  desc;

  /**
   * 圖片網址。
   * @type {string}
   */
  img;

  /**
   * 所有分類標籤 ID。
   * @type {number[]}
   */
  tags;

  /**
   * 是否販售中？
   * @type {boolean}
   */
  isOnSale = false;

  /**
   * 是否作為 Banner？
   * @type {boolean}
   */
  isBanner = false;

  /**
   * Banner 內容。
   * @type {string}
   */
  bannerDesc;

  /**
   * Event 單筆資料。
   * @param {Object} data Event 資料。
   */
  constructor(data) {
    super(data);
    this._assignData(data, EventRecord.#props);

    // 格式化的活動日期
    if (this.date) {
      this.abbrDate = DateService.formatAsDateAbbrMonthYear(this.date);
    }
  }
}
