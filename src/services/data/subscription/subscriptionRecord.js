import { Record } from "../record";

/**
 * 單筆訂閱資料
 */
export class SubscriptionRecord extends Record {
  static #props = ["email"];

  /**
   * Email。
   * @type {string}
   */
  email;

  /**
   * 單筆訂閱資料。
   * @param {Object} data Subscription 資料。
   */
  constructor(data) {
    super(data);
    this._assignData(data, SubscriptionRecord.#props);
  }
}
