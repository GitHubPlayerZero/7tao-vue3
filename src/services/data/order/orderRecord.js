import { OrderHisRecord } from "./orderHisRecord";

/**
 * 訂單單筆資料。
 */
export class OrderRecord extends OrderHisRecord {
  static #props = [
    "eventId",
    "ticketId",
    "userId",
    "userName",
    "email",
    "mobilePhone",
    "eventTitle",
    "eventDate",
    "ticketType",
    "ticketPrice",
    "isCancel",
    "createdDate",
    "updatedDate",
  ];

  /**
   * 活動 ID。
   * @type {number}
   */
  eventId;

  /**
   * 票券 ID。
   * @type {number}
   */
  ticketId;

  /**
   * 使用者 ID。
   * @type {number}
   */
  userId;

  /**
   * 使用者姓名。
   * @type {string}
   */
  userName;

  /**
   * 電子信箱。
   * @type {string}
   */
  email;

  /**
   * 行動電話。
   * @type {string}
   */
  mobilePhone;

  /**
   * 活動名稱。
   * @type {string}
   */
  eventTitle;

  /**
   * 活動日期。
   * 格式為 YYYY/MM/DD，例如 2026/08/09。
   * @type {string}
   */
  eventDate;

  /**
   * 票券類型。
   * @type {string}
   */
  ticketType;

  /**
   * 票券價格。
   * @type {number}
   */
  ticketPrice;

  /**
   * 是否退票。
   * @type {boolean}
   */
  isCancel = false;

  /**
   * 建立的日期時間（TIMESTAMP）。
   * @type {number}
   */
  createdDate;

  /**
   * 更新的日期時間（TIMESTAMP）。
   * @type {number}
   */
  updatedDate;

  /**
   * 訂單單筆資料。
   * @param {Object} data 訂單資料。
   */
  constructor(data) {
    super(data);
    this._assignData(data, OrderRecord.#props);
  }
}
