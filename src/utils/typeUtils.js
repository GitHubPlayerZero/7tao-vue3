/**
 * 型別處理工具
 */
export class TypeUtils {
  /**
   * 是否為物件？嚴格要求為物件，陣列不會被視為物件。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 物件回傳 true，否則回傳 false。
   */
  static isStrictObject(val) {
    // prettier-ignore
    try {
      return Object.getPrototypeOf(val) === Object.prototype;
    }
    // eslint-disable-next-line no-unused-vars
    catch (error) {
      return false;
    }
  }

  /**
   * 是否為事件？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 事件回傳 true，否則回傳 false。
   */
  static isEvent(val) {
    return val instanceof Event;
  }

  /**
   * 是否為原始型別字串？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 原始型別字串回傳 true，否則回傳 false。
   */
  static isPrimitiveString(val) {
    return typeof val === "string";
  }

  /**
   * 是否為物件型別字串？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 物件型別字串回傳 true，否則回傳 false。
   */
  static isObjectString(val) {
    return val instanceof String;
  }

  /**
   * 是否為字串？
   * 包含原始型別及物件型別。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 字串回傳 true，否則回傳 false。
   */
  static isString(val) {
    return this.isPrimitiveString(val) || this.isObjectString(val);
  }

  /**
   * 是否為 Infinity？
   * 正負 Infinity 都會視為 Infinity。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 正負 Infinity 均回傳 true，否則回傳 false。
   */
  static isInfinity(val) {
    return val === Infinity || val === -Infinity;
  }

  /**
   * 是否為 NaN？
   * @param {*} val 要判斷的值。
   * @returns {boolean} NaN 回傳 true，否則回傳 false。
   */
  static isNaN(val) {
    return Number.isNaN(val);
  }

  /**
   * 是否為原始型別數字？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 原始型別數字回傳 true，否則回傳 false。
   */
  static isPrimitiveNumber(val) {
    return Number.isFinite(val);
  }

  /**
   * 是否為物件型別數字？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 物件型別數字回傳 true，否則回傳 false。
   */
  static isObjectNumber(val) {
    return val instanceof Number;
  }

  /**
   * 是否為數字？
   * 只能為數字型態，可以是原始型別或物件型別。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 原始型別或物件型別數字回傳 true，否則回傳 false。
   */
  static isStrictNumber(val) {
    return this.isPrimitiveNumber(val) || this.isObjectNumber(val);
  }

  /**
   * 是否為數字？
   * 只檢查內容是否為數字，可以是原始型別、物件型別，以及字串型別。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 原始型別、物件型別或字串型別的數字回傳 true，否則回傳 false。
   */
  static isLooseNumber(val) {
    // 符合嚴格判斷的數字
    if (this.isStrictNumber(val)) {
      return true;
    }

    // 字串 且 內容為有效數字
    if (this.isString(val) && this.isPrimitiveNumber(Number(val))) {
      return true;
    }

    // 其它情況則不為數字
    return false;
  }

  /**
   * 轉換為數字，可將物件型別、字串型別數字轉換為原始型別數字。
   * @param {number|Object|string} val 要轉換的值。
   * @returns {number} 原始型別數字。
   * @throws 若不是正常的數字格式則拋出錯誤訊息。
   */
  static converToNumber(val) {
    if (this.isLooseNumber(val)) {
      return Number(val);
    }
    throw Error(`${val} 為不正確的數字格式！`);
  }
}
