import { TicketApi } from "@/api";

/**
 * Ticket 資料相關邏輯
 */
export class TicketService {
  /**
   * 取得所有票券資訊。
   * 對應於 {@link TicketApi.fetchTickets} 的處理。
   * @returns {Promise<Object[]>} 由後端取回的資料，預設空陣列。
   */
  static async fetchTickets() {
    let result;
    await TicketApi.fetchTickets()
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return result || [];
  }

  /**
   * 取得活動相關票券資訊。
   * 對應於 {@link TicketApi.fetchEventTickets} 的處理。
   * @param {number} eventId 活動 ID。
   * @returns {Promise<Object[]>} 由後端取回的資料，預設空陣列。
   */
  static async fetchEventTickets(eventId) {
    let result;
    await TicketApi.fetchEventTickets(eventId)
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return result || [];
  }
}
