import { Api } from "./api";

/**
 * Ticket API 介接
 */
export class TicketApi extends Api {
  static get url() {
    return "/tickets";
  }

  /**
   * 取得所有 Ticket 資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchTickets() {
    return this._axios.get(`${this.url}`);
  }

  /**
   * 依據 event 取得相關 Ticket 資料。
   * @param {number} eventId Event ID。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchEventTickets(eventId) {
    return this._axios.get(`${this.url}?eventId=${eventId}`);
  }
}
