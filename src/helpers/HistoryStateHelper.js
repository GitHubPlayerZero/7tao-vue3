import { DataUtils } from "./dataUtils";

/**
 * 處理 history state。
 */
export class HistoryStateHelper {
  /**
   * 由 history state 取得資料，物件類型的資料會做拷貝。
   * @param {string} stateName 資料在 history state 中的名稱。
   * @returns {*} 由 history state 取得的資料，若為物件類型則會回傳其深拷貝。
   */
  static getData(stateName) {
    const data = history.state[stateName];

    if (data instanceof Object) {
      return DataUtils.copy(data);
    } else {
      return data;
    }
  }

  /**
   * 修改 history state 部份資料。
   * @param {Object} data 資料物件，會依據此物件內容更新 history state 內容。
   */
  static updateData(data) {
    history.replaceState({ ...history.state, ...data }, "");
  }
}
