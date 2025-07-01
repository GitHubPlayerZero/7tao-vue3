import { Api } from "./api";

/**
 * Subscription API 介接
 */
export class SubscriptionApi extends Api {
  static get url() {
    return "/subscriptions";
  }

  /**
   * 取得所有 Subscription 資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchSubscriptions() {
    return this._axios.get(`${this.url}`);
  }

  /**
   * 以 ID 取得唯一的 Subscription 資料。
   * @param {number} id 欲取得資料的 ID。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchSubscription(id) {
    return this._axios.get(`${this.url}/${id}`);
  }

  /**
   * 以 email 取得 Subscription 資料。
   * 正確規格不會有重複的 email，故應只會有一筆。
   * @param {string} email Email。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchSubscriptionByEmail(email) {
    return this._axios.get(`${this.url}?email=${email}`);
  }

  /**
   * 新增 subscription 資料。
   * @param {Object} data subscription 資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static postSubscription(data) {
    return this._axios.post(`${this.url}`, data);
  }

  /**
   * 修改 subscription 資料。
   * @param {number} id 欲修改資料的 ID。
   * @param {Object} data subscription 資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static putSubscription(id, data) {
    return this._axios.put(`${this.url}/${id}`, data);
  }

  /**
   * 刪除 subscription 資料。
   * @param {number} id 欲刪除的資料 ID。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static deleteSubscription(id) {
    return this._axios.delete(`${this.url}/${id}`);
  }
}
