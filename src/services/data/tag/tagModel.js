import { Model } from "../model";
import { TagRecord } from "./tagRecord";
import { TagService } from "./tagService";

/**
 * Tag 資料模型
 */
export class TagModel extends Model {
  /**
   * Tag 資料集。
   * @type {TagRecord[]}
   */
  get datas() {
    return this._datas;
  }

  /**
   * 以 Tag ID 為鍵項的鍵值對應資料。
   * @type {Object<number, TagRecord>}
   * @protected
   */
  _idMap = {};

  /**
   * Tag 資料模型。
   * @param {Object[]} [tags] Tag 資料集。
   */
  constructor(tags = []) {
    super();

    tags.forEach((item) => {
      // 轉換資料
      const tagRecord = new TagRecord(item);
      // 建置資料集
      this._datas.push(tagRecord);
      // 建置 ID 對應資料。
      this._idMap[tagRecord.id] = tagRecord;
    });
  }

  /**
   * 以 ID 取得 Tag 名稱。
   * @param {number} id Tag 的 ID。
   * @returns {string} Tag 的名稱。
   */
  getNameById(id) {
    return this._idMap[id]?.name;
  }

  /**
   * 以名稱找到對應的 Tag ID，會先使用完全比對，若查無資料再使用模糊比對。
   * @param {string} name 要比對名稱的字串。
   * @returns {number} 第一個找到的 Tag ID。
   */
  getIdByName(name) {
    return TagService.searchByName(this._datas, name)?.id;
  }

  /**
   * 建立 Tag 資料物件。
   * @param {number} id Tag ID。
   * @returns {{id: number, name: string}} Tag 資料物件。
   */
  createTagObj(id) {
    return {
      id,
      name: this.getNameById(id),
    };
  }

  /**
   * 檢驗是否為 TagModel。
   * @param {*} model 要檢驗的值。
   * @returns {boolean} 為 TagModel 回傳 true，否則回傳 false。
   */
  static isMe(model) {
    return model && Object.getPrototypeOf(model) === this.prototype;
  }
}
