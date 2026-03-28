import { Api } from "./api";

/**
 * 訂單 API 介接
 */
export class OrderApi extends Api {
  /**
   * 訂單資源路徑。
   * @returns {string} 訂單資源路徑。
   */
  static get url() {
    return "/orders";
  }

  /**
   * 僅限自己讀寫的訂單資源路徑。
   * @returns {string} 訂單資源路徑，有權限管制，僅限自己讀寫。
   */
  static get authSelfUrl() {
    return `/600${this.url}`;
  }

  /**
   * 供系統 Admin 寫入的訂單資源路徑。
   * @returns {string} 訂單資源路徑，有權限管制，供系統 Admin 寫入。
   */
  static get authAdminUrl() {
    return `/660${this.url}`;
  }

  /**
   * 新增訂單資料。
   * @param {Object} data 訂單資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static postSelfOrder(data) {
    return this._axios.post(`${this.authSelfUrl}`, data, Api.authConfig);
  }
}
