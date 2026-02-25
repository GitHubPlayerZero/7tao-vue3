import { Record } from "../record";

/**
 * 單筆使用者資料
 */
export class UserRecord extends Record {
  static #props = ["email", "password", "rocId", "name", "mobilePhone", "gender"];

  /**
   * Email。
   * @type {string}
   */
  email = "";

  /**
   * 密碼。
   * @type {string}
   */
  password = "";

  /**
   * 身份證字號。
   * @type {string}
   */
  rocId = "";

  /**
   * 姓名。
   * @type {string}
   */
  name = "";

  /**
   * 手機。
   * @type {string}
   */
  mobilePhone = "";

  /**
   * 性別。
   * @type {string}
   */
  gender = "";

  /**
   * 單筆使用者資料。
   * @param {UserData} data 使用者資料。
   */
  constructor(data) {
    super(data);
    this._assignData(data, UserRecord.#props);
  }
}
