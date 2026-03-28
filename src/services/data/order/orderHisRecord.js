import { Record } from "../record";

/**
 * 訂單
 */
export class OrderHisRecord extends Record {
  static #props = ["orderNo", "collectionNo", "ticketNo"];

  /**
   * 訂單編號。
   * @type {string}
   */
  orderNo;

  /**
   * 取票序號。
   * @type {string}
   */
  collectionNo;

  /**
   * 票券編號。
   * @type {string}
   */
  ticketNo;

  /**
   * 訂單單筆資料。
   * @param {Object} data 訂單資料。
   */
  constructor(data) {
    super(data);
    this._assignData(data, OrderHisRecord.#props);
  }

  /**
   * 將資料轉換成 history state 物件。
   */
  convertToHisState() {
    const historyState = {};

    OrderHisRecord.#props.forEach((item) => {
      historyState[item] = this[item];
    });

    return historyState;
  }

  /**
   * 由 history state 取得資料並組成 OrderHisRecord 物件回傳。
   * @returns {OrderHistRecord} 存放了 history state 資料的 OrderHisRecord 物件。
   */
  static getHisRecord() {
    return new OrderHisRecord(history.state);
  }
}
