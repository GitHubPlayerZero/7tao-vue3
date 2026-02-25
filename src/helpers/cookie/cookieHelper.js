// eslint-disable-next-line no-unused-vars
import { Cookie } from "./cookie";

/**
 * 處理 Cookie 相關事務。
 */
export class CookieHelper {
  /**
   * 保存 Cookie，可用於新增、修改。
   * 注意：Cookie 會依據 name + domain + path 作為修改依據。
   * @param {Cookie} cookie {@link Cookie} 物件。
   */
  static saveCookie(cookie) {
    document.cookie = cookie.toString();
  }

  /**
   * 刪除 Cookie。
   * 注意：Cookie 會依據 name + domain + path 作為刪除依據。
   * @param {Cookie} cookie {@link Cookie} 物件。
   */
  static removeCookie(cookie) {
    cookie.setMaxAge(-1);
    document.cookie = cookie.toString();
  }

  /**
   * 判斷是否有此 Cookie。
   * @param {string} name Cookie 名稱。
   * @returns {boolean} Cookie 存在回傳 true，否則回傳 false。
   */
  static hasCookie(name) {
    const rule = new RegExp(`(^|; )${name}=`);
    return rule.test(document.cookie);
  }

  /**
   * 取得 Cookie。
   * @param {string} name Cookie 名稱。
   * @returns {string} Cookie 的值（value）。
   */
  static getCookie(name) {
    const reg = new RegExp(`(?:(?:^|.*;)\\s*${name}\\s*\\=\\s*([^;]*).*$)|^.*$`);
    return document.cookie.replace(reg, "$1");
  }
}
