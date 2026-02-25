/**
 * 各種驗證。
 */
export class CheckHelper {
  /** 正規表達式 - 正整數 */
  static positiveIntegerPattern = /^\d+$/;
  /** 正規表達式 - 整數（允許負數）。 */
  static integerPattern = /^-?\d+$/;
  /** 正規表達式 - 大於零的整數 */
  static intGreaterThanZeroPattern = /^[1-9]\d*$/;

  /**
   * 數字格式正規表達式：
   * 1. 允許負數。
   * 2. 允許小數。
   */
  static numberPattern = /^-?\d+(\.\d+)?$/;

  /**
   * 台灣身份證字號格式正規表達式：
   * 1. 第一個字為縣代碼：A ~ Z 的大寫字母。
   * 2. 第二個字為性別：男性為 1，女性為 2。
   * 3. 後面為 8 碼數字。
   */
  static rocIdPattern = /^[A-Z][12]\d{8}$/;

  /**
   * 台灣手機號碼格式正規表達式：
   * 1. 以 09 開頭。
   * 2. 後接 8 位數字，共 10 位數字。
   */
  static mobilePhonePattern = /^09\d{8}$/;

  /**
   * 密碼格式：
   * 1. 只能使用英文及數字。
   * 2. 必須同時包含英文及數字。
   * 3. 長度為 8 ~ 12 碼。
   */
  static pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;

  /**
   * 檢查是否為有效的數字格式。
   * @param {number|string} val 要檢查的值。
   * @returns {boolean} 驗證正確回傳 true，否則回傳 false。
   */
  static isValidNumber(val) {
    return this.numberPattern.test(val);
  }

  /**
   * 檢查是否為有效的台灣身份證字號。
   * @param {string} id 台灣身份證字號。
   * @returns {boolean} 驗證正確回傳 true，否則回傳 false。
   */
  static isValidRocId(id) {
    /** 1. 檢查格式 */
    if (!this.rocIdPattern.test(id)) {
      return false;
    }

    /** 2. 檢查邏輯：https://swf.com.tw/?p=94 */
    // 字母對應的數字表
    const alphabetMap = {
      A: "10",
      B: "11",
      C: "12",
      D: "13",
      E: "14",
      F: "15",
      G: "16",
      H: "17",
      I: "34",
      J: "18",
      K: "19",
      L: "20",
      M: "21",
      N: "22",
      O: "35",
      P: "23",
      Q: "24",
      R: "25",
      S: "26",
      T: "27",
      U: "28",
      V: "29",
      W: "32",
      X: "30",
      Y: "31",
      Z: "33",
    };

    // 十碼數字對應的權重
    const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    // 最後一碼為檢查碼
    const checksum = Number(id.slice(-1));

    // 作為運算檢查的資料：將首字母轉為對應數字後接續後九碼，共十碼數字進行運算。
    const data = alphabetMap[id.substring(0, 1)] + id.substring(1, 9);

    // 資料運算
    let result = data.split("").reduce((acc, item, index) => {
      return acc + item * weights[index];
    }, 0);
    result = 10 - (result % 10);

    // 運算結果必須與檢查碼相等才算正確
    return result === checksum;
  }

  /**
   * 檢查是否為有效的手機號碼格式（台灣）。
   * @param {string} phoneNumber 手機號碼。
   * @returns {boolean} 驗證正確回傳 true，否則回傳 false。
   */
  static isValidMobilePhone(phoneNumber) {
    return this.mobilePhonePattern.test(phoneNumber);
  }

  /**
   * 檢查是否為有效的密碼格式。
   * @param {string} password 密碼。
   * @returns {boolean} 驗證正確回傳 true，否則回傳 false。
   */
  static isValidPassword(password) {
    return this.pwdPattern.test(password);
  }
}
