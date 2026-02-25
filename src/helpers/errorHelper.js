import { TypeUtils } from "./typeUtils";

/**
 * 協助處理各種錯誤訊息
 */
export class ErrorHelper {
  /**
   * 判斷是否為 Axios 的錯誤。
   * @param {Error} error 錯誤物件。
   * @returns {boolean} 若為 Axios 的錯誤回傳 true，否則回傳 false。
   */
  static isAxiosError(error) {
    return Boolean(error.isAxiosError);
  }

  /**
   * 判斷是否為 JS 的錯誤。
   * @param {Error} error 錯誤物件。
   * @returns {boolean} 若為 JS 的錯誤回傳 true，否則回傳 false。
   */
  static isJsError(error) {
    return error instanceof Error;
  }

  /**
   * 取得 axios 部份的錯誤資訊。
   * 較新版本的 axios 在印出錯誤時，只會印出簡單的文字訊息，且並非準確的訊息。
   * 這邊使用 .toJSON() 取出更多的錯誤資訊，但並非全部的資訊（request、response 等部份資訊會被省略）。
   * @param {AxiosError} error Axios 錯誤資訊的物件。
   * @returns {Object} 錯誤資訊的物件，只有 AxiosError 裡的部份資訊。
   */
  static getAxiosSimpleError(error) {
    return error.toJSON();
  }

  /**
   * 取得 axios 完整的錯誤資訊。
   * 由於較新版本的 axios 在印出錯誤時，只會印出簡單的文字訊息，且並非準確的訊息，因此需要自己先取出 AxiosError 裡的所有資訊，並組成新的物件回傳，才能像以前那樣顯示完整的資訊。
   * @param {AxiosError} error Axios 錯誤資訊的物件。
   * @returns {Object} 新的錯誤資訊的物件，包含 AxiosError 裡的所有資訊。
   */
  static getAxiosFullError(error) {
    const { code, config, isAxiosError, name, request, response, status, message, stack } = error;
    return { code, config, isAxiosError, name, request, response, status, message, stack };
  }

  /**
   * 格式化 axios 的錯誤。
   * @param {AxiosError} error Axios 錯誤資訊的物件。
   * @returns {string} 格式化後的錯誤訊息，若非 Axios 的錯誤物件則回傳空字串。
   */
  static formatAxiosError(error) {
    // 判斷是否為 Axios 錯誤，若不是則返回
    if (!this.isAxiosError(error)) {
      console.warn(`此並非 Axios 錯誤，請改用 getErrorMsg()！`);
      return "";
    }

    const message = error.message;
    const statusText = error?.response?.statusText;
    const data = error.response.data;
    let errorMsg = ""; // 最後組成的錯誤訊息

    // 若 API 有給予製定的錯誤訊息，則使用之
    if (TypeUtils.isString(data)) {
      errorMsg = String(data);
    }
    // 否則，使用 Axios 本身的錯誤訊息
    else {
      errorMsg = `${message} (${statusText})`;
    }

    return errorMsg;
  }

  /**
   * 取得錯誤訊息，錯誤可能來自於 JS 的 Error 物件，或是 Axios 的失敗回應。
   * @param {Error} error 錯誤物件。
   * @returns {string} 錯誤訊息，若非有效的錯誤物件則回傳空字串。
   */
  static getErrorMsg(error) {
    // Axios Error
    // 由於 AxiosError 繼承 JS Error，因此要先判斷是否為 Axios 的錯誤，否則一定都會被判斷為 JS Error
    if (this.isAxiosError(error)) {
      return this.formatAxiosError(error);
    }
    // JS Error
    else if (this.isJsError(error)) {
      return error.message;
    }
    // 非有效錯誤
    else {
      console.warn(`此並非有效的錯誤物件！`);
      return "";
    }
  }
}
