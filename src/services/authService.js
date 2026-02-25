import router from "@/router";
import { useUserStore } from "@/stores";
import { SysConstants, Cookie, CookieHelper } from "@/helpers";
import { Redirector } from "@/services/redirector";

/**
 * 使用者權限相關處理。
 */
export class AuthService {
  /**
   * 取得使用者 token。
   * @returns {string} Token。
   */
  static getToken() {
    return CookieHelper.getCookie(SysConstants.cookieTokenName);
  }

  /**
   * 設定登入授權記錄。
   * @param {string} token Token。
   * @param {UserData} user 使用者資料。
   */
  static setLoginAuth(token, user) {
    // 將 token 記錄至 cookie
    const cookie = new Cookie(SysConstants.cookieTokenName);
    cookie.setMaxAge(SysConstants.cookieTokenTime);
    cookie.setValue(token);
    CookieHelper.saveCookie(cookie);

    // 設定使用者資料狀態
    useUserStore().set(user);
  }

  /**
   * 清除所有的登入授權記錄。
   */
  static clearLoginAuth() {
    // 清除使用者資料狀態
    useUserStore().clear();

    // 移除 cookie
    CookieHelper.removeCookie(new Cookie(SysConstants.cookieTokenName));
  }

  /**
   * 是否有登入？
   * @returns {boolean} 有登入回傳 true，否則回傳 false。
   */
  static hasLogin() {
    const hasUserStore = useUserStore().id; // store 中是否有使用者資料？
    const hasToken = CookieHelper.hasCookie(SysConstants.cookieTokenName); // Cookie 中是否有 token？
    return hasUserStore && hasToken; // 皆成立才算有登入
  }

  /**
   * 是否具備有效的授權？
   * 若沒有，則會進行登入授權記錄的清除，以避免是因為逾期而有殘留的記錄。
   * @returns {boolean} 具備有效授權回傳 true，否則回傳 false。
   */
  static checkValidPermission() {
    // 有登入
    if (AuthService.hasLogin()) {
      return true;
    }
    // 未登入
    else {
      // 清除登入授權記錄
      AuthService.clearLoginAuth();
      return false;
    }
  }

  /**
   * 頁面是否需要登入權限？
   * @param {Object} [meta] 路由的 meta 資料，預設為當前路由的 meta 資料。用於路由守衛時傳入 to.meta，一般頁面則可不傳。
   * @returns {boolean} 需要登入回傳 true，否則回傳 false。
   */
  static isRequiresLogin(meta = router.currentRoute.value.meta) {
    return meta?.isRequiresLogin ?? false;
  }

  /**
   * 登出。
   */
  static logout() {
    AuthService.clearLoginAuth();

    // 如果目前的頁面是需要登入才能進入的頁面，則導回首頁
    if (AuthService.isRequiresLogin()) {
      Redirector.logout();
    }
  }
}
