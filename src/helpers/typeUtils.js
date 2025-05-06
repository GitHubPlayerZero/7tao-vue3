/**
 * 型別處理工具
 */
export class TypeUtils {
  /**
   * 取得原始值。
   * @param {*} val 要判斷的值。
   * @returns 若為原始型別則直接回傳，若為物件則回傳其原始值。
   */
  static getPrimitiveValue(val) {
    return val instanceof Object ? val.valueOf() : val;
  }

  /**
   * 本身是否為純粹的物件型別？例如 {}。
   * 陣列、數字物件、字串物件、布林物件等不會被視為純粹的物件型別。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 本身為純粹的物件型別則回傳 true，否則回傳 false。
   */
  static isExactObject(val) {
    // prettier-ignore
    // undefined、null 無法轉成 Object，因此會發生異常
    try {
      return Object.getPrototypeOf(val) === Object.prototype;
    }
    // eslint-disable-next-line no-unused-vars
    catch (error) {
      return false;
    }
  }

  /**
   * 是否為陣列？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 陣列回傳 true，否則回傳 false。
   */
  static isArray(val) {
    return Array.isArray(val);
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
   * 是否為 HTML 元素？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 為 HTML 元素回傳 true，否則回傳 false。
   */
  static isHtmlElement(val) {
    return val instanceof HTMLElement;
  }

  /**
   * 是否為字串？
   * 包含原始型別及物件型別。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 字串回傳 true，否則回傳 false。
   */
  static isString(val) {
    return typeof this.getPrimitiveValue(val) === "string";
  }

  /**
   * 是否為數字？
   * 包含原始型別及物件型別。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 數字回傳 true，否則回傳 false。
   */
  static isNumber(val) {
    return typeof this.getPrimitiveValue(val) === "number";
  }

  /**
   * 是否為 Infinity？
   * 包含原始型別及物件型別。
   * 正負 Infinity 都會視為 Infinity。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 正負 Infinity 均回傳 true，否則回傳 false。
   */
  static isInfinity(val) {
    const primitiveValue = this.getPrimitiveValue(val);
    return primitiveValue === Infinity || primitiveValue === -Infinity;
  }

  /**
   * 是否為 NaN？
   * 包含原始型別及物件型別。
   * @param {*} val 要判斷的值。
   * @returns {boolean} NaN 回傳 true，否則回傳 false。
   */
  static isNaN(val) {
    const primitiveValue = this.getPrimitiveValue(val);
    return Number.isNaN(primitiveValue);
  }

  /**
   * 是否為有效的數字？
   * 包含原始型別及物件型別，會排除 NaN、Infinity。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 不為 NaN、Infinity 的數字回傳 true，否則回傳 false。
   */
  static isValidNumber(val) {
    return Number.isFinite(this.getPrimitiveValue(val));
  }

  /**
   * 是否為有效的數字格式？
   * 只檢查內容是否為數字，可以是原始型別數字、物件型別數字，以及字串型別數字。
   * 會排除 NaN、Infinity。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 為有效的數字格式回傳 true，否則回傳 false。
   */
  static isValidNumberFormat(val) {
    // 為有效的數字
    if (this.isValidNumber(val)) {
      return true;
    }

    // 字串 且 內容為有效數字
    if (this.isString(val) && this.isValidNumber(Number(val))) {
      return true;
    }

    // 其它情況則不為數字
    return false;
  }

  /**
   * 轉換為數字，可將物件型別數字、字串型別數字轉換為原始型別數字。
   * @param {number|Object|string} val 要轉換的值。
   * @returns {number} 原始型別數字。
   * @throws 若不是正常的數字格式則拋出錯誤訊息。
   */
  static converToNumber(val) {
    if (this.isValidNumberFormat(val)) {
      return Number(val);
    }
    throw TypeError(`${val} 為不正確的數字格式！`);
  }

  /**
   * 是否為 null 或 undefined？
   * @param {*} val 要判斷的值。
   * @returns {boolean} 為 null 或 undefined 則回傳 true，否則回傳 false。
   */
  static isNullUndefined(val) {
    return val === undefined || val === null;
  }

  /**
   * 是否為有效值？
   * 空值也算有效值，但會排除 null、undefined、NaN、Infinity。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 不為 null、undefined、NaN、Infinity 即回傳 true，否則回傳 false。
   */
  static isValid(val) {
    return !(this.isNullUndefined(val) || this.isInfinity(val) || this.isNaN(val));
  }

  /**
   * 是否為空字串？會檢核型別及內容。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 空字串回傳 true，否則回傳 false。
   */
  static isEmptyString(val) {
    return this.isString(val) && val.length <= 0;
  }

  /**
   * 是否為有內容的字串？會檢核型別及內容。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 字串有內容回傳 true，否則回傳 false。
   */
  static isStringWithValue(val) {
    return this.isString(val) && val.length > 0;
  }

  /**
   * 是否為空陣列？會檢核型別及內容。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 為空陣列回傳 true，否則回傳 false。
   */
  static isEmptyArray(val) {
    return this.isArray(val) && val.length <= 0;
  }

  /**
   * 是否為有內容的陣列？會檢核型別及內容。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 陣列有元素回傳 true，否則回傳 false。
   */
  static isArrayWithItems(val) {
    return this.isArray(val) && val.length > 0;
  }

  /**
   * 是否為空物件？會檢核型別及內容。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 物件沒有屬性回傳 true，否則回傳 false。
   */
  static isEmptyObject(val) {
    return this.isExactObject(val) && Object.keys(val).length <= 0;
  }

  /**
   * 是否為有內容的物件？會檢核型別及內容。
   * 以鍵項數量判斷是否有屬性。
   * @param {*} val 要判斷的值。
   * @returns {boolean} 物件有屬性回傳 true，否則回傳 false。
   */
  static isObjectWithKeys(val) {
    return this.isExactObject(val) && Object.keys(val).length > 0;
  }
}
