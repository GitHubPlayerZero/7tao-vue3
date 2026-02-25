import { Api } from "./api";

/**
 * 使用者相關 API 介接
 */
export class UserApi extends Api {
  /**
   * 使用者資源路徑。
   * @returns {string} 使用者資源路徑。
   */
  static get url() {
    return "/users";
  }

  /**
   * 僅限自己讀寫的使用者資源路徑。
   * @returns {string} 使用者資源路徑，有權限管制，僅限自己讀寫。
   */
  static get authSelfUrl() {
    return `/600${this.url}`;
  }

  /**
   * 供系統 Admin 寫入的使用者資源路徑。
   * @returns {string} 使用者資源路徑，有權限管制，供系統 Admin 寫入。
   */
  static get authAdminUrl() {
    return `/660${this.url}`;
  }

  /**
   * 取得所有 User 資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchAll() {
    return this._axios.get(`${this.url}`);
  }

  /**
   * 以 ID 取得唯一的 User 資料。
   * @param {number} id 欲取得資料的 ID。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchById(id) {
    return this._axios.get(`${this.url}/${id}`);
  }

  /**
   * 以 email 取得 User 資料。
   * Email 即為帳號，正確規格不會有重複的 email，故應只會有一筆。
   * @param {string} email 使用者 email。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchByEmail(email) {
    return this._axios.get(`${this.url}?email=${email}`);
  }

  /**
   * 註冊（新增 User 資料）。
   * @param {RegisterData} data 註冊資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static register(data) {
    return this._axios.post(`/register`, data);
  }

  /**
   * 登入。
   * @param {string} email 使用者 email（帳號）。
   * @param {string} password 使用者密碼。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static login(email, password) {
    const data = { email, password };
    return this._axios.post(`/login`, data);
  }

  /**
   * 取得自己的 User 資料。
   * @param {string} token 欲取得資料的使用者 Token。
   * @param {number} id 欲取得資料的 ID。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchSelf(token, id) {
    return this._axios.get(`${this.authSelfUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * 修改自己的 User 資料。
   * @param {string} token 欲修改的使用者 Token。
   * @param {number} id 欲修改資料的 ID。
   * @param {EditableUserData} data 使用者資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static patchSelf(token, id, data) {
    return this._axios.patch(`${this.authSelfUrl}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * 刪除自己的 User 資料。
   * @param {string} token 欲刪除的使用者 Token。
   * @param {number} id 欲刪除的資料 ID。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static deleteSelf(token, id) {
    return this._axios.delete(`${this.authSelfUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
