/**
 * 資料處理工具
 */
export class DataUtils {
  /**
   * 深拷貝。
   * @param {Object|Array} source 來源資料。
   * @returns {Object|Array} 拷貝的資料。
   */
  static copy(source) {
    return JSON.parse(JSON.stringify(source));
  }

  /**
   * 將類別物件轉換為 JSON 物件。
   * @param {Object} claz 類別物件。
   * @returns {Object} 轉換後的 JSON 物件。
   */
  static classToJson(claz) {
    return JSON.parse(JSON.stringify(claz));
  }
}
