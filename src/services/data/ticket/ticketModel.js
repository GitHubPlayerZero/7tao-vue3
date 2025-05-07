import { Model } from "../model";
import { TicketRecord } from "./ticketRecord";

/**
 * Ticket 資料模型
 */
export class TicketModel extends Model {
  /**
   * Ticket 資料集。
   * @type {TicketRecord[]}
   */
  get datas() {
    return this._datas;
  }

  /**
   * Ticket 資料模型。
   * @param {Object[]} [tickets] Ticket 資料集。
   */
  constructor(tickets = []) {
    super();

    tickets.forEach((item) => {
      // 轉換資料
      const ticketRecord = new TicketRecord(item);
      // 建置資料集
      this._datas.push(ticketRecord);
    });
  }
}
