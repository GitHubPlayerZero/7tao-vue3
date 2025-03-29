import { BannerRecord } from "./bannerRecord";

/**
 * Event 單筆資料。
 */
export class EventRecord extends BannerRecord {
  static #props = ["desc", "tags", "isOnSale", "isBanner"];

  /**
   * 內容說明。
   * @type {string}
   */
  desc;
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
   * Event 單筆資料。
   * @param {Object} data Event 資料。
   */
  constructor(data) {
    super(data);
    this._assignData(data, EventRecord.#props);
  }
}
