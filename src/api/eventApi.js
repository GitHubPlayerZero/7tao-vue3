import { Api } from "./api";
import { DateUtils } from "@/utils";

/**
 * Event 相關資料處理
 */
export class EventApi extends Api {
  static #eventUrl = "/events";

  // 主分類標籤的 index，預設以第一個標籤為主要分類
  static get mainTagIndex() {
    return 0;
  }

  /**
   * 取得所有未過期活動，預設以日期由近至遠排序。
   * @returns {Promise} 由後端取回的資料。
   */
  static async fetchEvents() {
    let result;

    await this._axios
      .get(`${this.#eventUrl}?date_gte=${DateUtils.getTomorrow()}&_sort=date`)
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });

    return result;
  }

  /**
   * 取得 banner 活動，預設以日期由近至遠排序。
   * @returns {Promise} 由後端取回的資料。
   */
  static async fetchBanners() {
    let result;

    await this._axios
      .get(`${this.#eventUrl}?isBanner=true&_sort=date`)
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });

    return result;
  }

  /**
   * 取得主分類標籤 ID。
   * @param {Object} event 活動資料。
   * @returns {number} 主分類標籤的 ID。
   */
  static getMainTagId(event) {
    return event?.tags[this.mainTagIndex];
  }

  /**
   * 取得主分類之外的其它分類標籤 ID。
   * @param {Object} event 活動資料。
   * @returns {Array} 其它分類標籤的 ID。
   * @throws 沒有 tags 資料時拋出錯誤。
   */
  static getOtherTagId(event) {
    const tags = event?.tags;
    if (!tags) {
      throw Error("必須要有 tags 資料！");
    }
    return tags.slice(this.mainTagIndex + 1);
  }
}
