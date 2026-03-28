import axios from "axios";
import { SysConstants } from "@/helpers";
import { AuthService } from "@/services";

/**
 * API 共用設定
 */
export class Api {
  static #axios = axios.create({
    baseURL: SysConstants.apiBaseUrl,
  });

  static get _axios() {
    return Api.#axios;
  }

  /**
   * 取得帶有授權資訊的 headers。
   * @returns {{headers: {Authorization: String}}} 包含授權資訊的 headers。
   * @throws {Error} 如果使用者沒有權限，則拋出錯誤。
   */
  static get authConfig() {
    const token = AuthService.getToken();
    if (!token) {
      throw Error("使用者沒有權限！");
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
