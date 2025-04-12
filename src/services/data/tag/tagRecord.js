import { Record } from "../record";

/**
 * Tag 單筆資料。
 */
export class TagRecord extends Record {
  static #props = ["name"];

  /**
   * 名稱。
   * @type {string}
   */
  name;

  /**
   * Tag 單筆資料。
   * @param {Object} data Tag 資料。
   */
  constructor(data) {
    super(data);
    this._assignData(data, TagRecord.#props);
  }
}
