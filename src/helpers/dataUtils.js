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
}