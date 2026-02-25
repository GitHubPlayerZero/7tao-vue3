import { UserApi } from "@/api";
import { ErrorHelper } from "@/helpers";

/**
 * 使用者資料相關邏輯
 */
export class UserService {
  /**
   * 取得所有使用者資訊。
   * 對應於 {@link UserApi.fetchAll} 的處理。
   * @returns {Promise<UserData[]>} 使用者資料集合，預設空陣列。
   */
  static async fetchAllUsers() {
    let result;
    await UserApi.fetchAll()
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(`[fetchAllUsers] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      });
    return result || [];
  }

  /**
   * 以 ID 取得唯一的使用者資料。
   * 對應於 {@link UserApi.fetchById} 的處理。
   * @param {number|string} id 使用者 ID。
   * @returns {Promise<UserData>} 單筆使用者資料，預設空物件。
   * @throws {Error} 若未提供 id 參數則拋出錯誤。
   */
  static async fetchUser(id) {
    if (!id) throw TypeError("必須提供 id 參數！");

    let result;
    await UserApi.fetchById(id)
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(`[fetchUser] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      });
    return result || {};
  }

  /**
   * 以 email 取得使用者資料。
   * Email 即為帳號，正確規格不會有重複的 email，故應只會有一筆。
   * 對應於 {@link UserApi.fetchByEmail} 的處理。
   * @param {string} email 使用者 email。
   * @returns {Promise<UserData>} 單筆使用者資料，預設空物件。
   * @throws {Error} 若未提供 email 參數則拋出錯誤。
   */
  static async fetchUserByEmail(email) {
    if (!email) throw TypeError("必須提供 email 參數！");

    let result;
    await UserApi.fetchByEmail(email)
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(`[fetchUserByEmail] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      });
    return result || {};
  }

  /**
   * 註冊新使用者。
   * 對應於 {@link UserApi.register} 的處理。
   * @param {RegisterData} userData 使用者資料。
   * @returns {Promise<UserData>} 註冊寫入的使用者資料。
   * @throws {Error} 若未提供註冊資料或 Axios 執行異常則拋出錯誤。
   */
  static async register(userData) {
    if (!userData) throw TypeError("必須提供註冊資料！");

    try {
      const response = await UserApi.register(userData);
      return response.data;
    } catch (error) {
      console.error(`[register] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      throw error;
    }
  }

  /**
   * 登入。
   * 對應於 {@link UserApi.login} 的處理。
   * @param {string} email 使用者 email（帳號）。
   * @param {string} password 使用者密碼。
   * @returns {Promise<APIUserData>} 登入的使用者資料。
   * @throws {Error} 若未提供登入資料或 Axios 執行異常則拋出錯誤。
   */
  static async login(email, password) {
    if (!email || !password) throw TypeError("必須提供登入資料（Email、密碼）！");

    try {
      const response = await UserApi.login(email, password);
      return response.data;
    } catch (error) {
      console.error(`[login] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      throw error;
    }
  }

  /**
   * 取得自己的使用者資料。
   * 對應於 {@link UserApi.fetchSelf} 的處理。
   * @param {string} token 自己登入的 Token。
   * @param {number} id 自己資料的 ID。
   * @returns {Promise<UserData>} 自己的使用者資料。
   * @throws {Error} 若未提供 token 或 id 參數，會拋出錯誤。
   */
  static async fetchSelf(token, id) {
    if (!token) throw TypeError("必須提供 token 參數！");
    if (!id) throw TypeError("必須提供 id 參數！");

    let result;
    await UserApi.fetchSelf(token, id)
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(`[fetchSelf] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      });
    return result || {}; // 檢查並過濾使用者資料
  }

  /**
   * 修改自己的使用者資料。
   * 對應於 {@link UserApi.patchSelf} 的處理。
   * @param {string} token 自己登入的 Token。
   * @param {number} id 自己資料的 ID。
   * @param {UserData} userData 使用者資料。
   * @returns {Promise<UserData>} 更新後的使用者資料。
   * @throws {Error} 若未提供 token、id、使用者資料，或資料有誤，或 Axios 執行異常，均會拋出錯誤。
   */
  static async modifySelf(token, id, userData) {
    if (!token) throw TypeError("必須提供 token 參數！");
    if (!id) throw TypeError("必須提供 id 參數！");
    if (!userData) throw TypeError("必須提供使用者資料！");

    try {
      const response = await UserApi.patchSelf(token, id, userData);
      return response.data;
    } catch (error) {
      console.error(`[modifySelf] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      throw error;
    }
  }

  /**
   * 刪除自己的使用者資料。
   * 對應於 {@link UserApi.deleteSelf} 的處理。
   * @param {string} token 自己登入的 Token。
   * @param {number} id 自己資料的 ID。
   * @throws {Error} 若未提供 token、id，或 Axios 執行異常，均會拋出錯誤。
   */
  static async deleteSelf(token, id) {
    if (!token) throw TypeError("必須提供 token 參數！");
    if (!id) throw TypeError("必須提供 id 參數！");

    try {
      await UserApi.deleteSelf(token, id);
    } catch (error) {
      console.error(`[deleteSelf] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      throw error;
    }
  }
}
