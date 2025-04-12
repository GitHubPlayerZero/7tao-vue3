/**
 * 單筆資料基礎內容
 */
export class Record {
  static #props = ["id"];

  /**
   * ID。
   * @type {number}
   */
  id;

  /**
   * 單筆資料基礎內容。
   * @param {Object[]} data 資料。
   */
  constructor(data) {
    this._assignData(data, Record.#props);
  }

  /**
   * 設定 class 資料。
   * 以 class 屬性名稱查找資料的同名屬性，
   * 若資料屬性的內容為 null 或 undefined，則會使用 class 屬性預設值；
   * 否則會設定為資料的屬性內容。
   * @param {Object} data 資料。
   * @param {string[]} props class 屬性名稱。
   * @protected
   */
  _assignData(data, props) {
    if (data && props) {
      props.forEach((key) => {
        this[key] = data[key] ?? this[key];
      });
    }
  }
}
