import { Api } from "./api";
import { DateUtils } from "@/utils";

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
   * 取得 banner 活動，預設以日期由近至遠排序。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchBanners() {
    return this._axios.get(`${this.url}?isBanner=true&_sort=date`);
  }
}
