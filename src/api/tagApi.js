import { Api } from "./api";

/**
 * Tag API 介接
 */
export class TagApi extends Api {
  static get url() {
    return "/tags";
  }

  /**
   * 取得所有 Tag 資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchTags() {
    return this._axios.get(`${this.url}`);
  }
}
