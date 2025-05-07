import { Record } from "../record";

/**
 * Ticket 單筆資料。
 */
export class TicketRecord extends Record {
  static #props = ["eventId", "type", "price", "qtyTotal", "qtyStock"];

  /**
   * 活動 ID。
   * @type {number}
   */
  eventId;

  /**
   * 票券種類。
   * @type {string}
   */
  type;

  /** 價格。 */
  price = 0;

  /** 總張數。 */
  qtyTotal = 0;

  /** 庫存張數。 */
  qtyStock = 0;

  /**
   * Ticket 單筆資料。
   * @param {Object} data Ticket 資料。
   */
  constructor(data) {
    super(data);
    this._assignData(data, TicketRecord.#props);
  }
}
