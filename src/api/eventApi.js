import { Api } from "./api";
import { DateUtils } from "@/helpers";

/**
 * Event API 介接
 */
export class EventApi extends Api {
  static get url() {
    return "/events";
  }

  /**
   * 取得所有未過期活動，預設以日期由近至遠排序。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchEvents() {
    return this._axios.get(`${this.url}?date_gte=${DateUtils.getTomorrow()}&_sort=date`);
  }

  /**
   * 取得單一活動資訊。
   * @param {number} id 活動 ID。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchEventInfo(id) {
    return this._axios.get(`${this.url}/${id}`);
  }

  /**
   * 取得 banner 活動，預設以日期由近至遠排序。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchBanners() {
    return this._axios.get(`${this.url}?isBanner=true&_sort=date`);
  }
}
