/**
 * 日期時間格式化樣式
 */
export class DateStyles {
  /**
   * 月份英文簡寫。
   */
  static get monthAbbr() {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  }

  /**
   * 西元年月日，無間隔符號，月、日不足兩碼者會在前方補 0。
   * 格式化範例："20250102"。
   */
  static get yyyymmdd() {
    return "[YYYY][MM][DD]";
  }

  /**
   * 西元年月日，之間以 "/" 間隔。
   * 格式化範例："2025/1/2"
   */
  static get yyyymdSlash() {
    return "[YYYY]/[M]/[D]";
  }

  /**
   * 西元年月日，之間以 "/" 間隔，月、日不足兩碼者會在前方補 0。
   * 格式化範例："2025/01/02"
   */
  static get yyyymmddSlash() {
    return "[YYYY]/[MM]/[DD]";
  }

  /**
   * 西元年月日，之間以 "-" 間隔。
   * 格式化範例："2025-1-2"
   */
  static get yyyymdDash() {
    return "[YYYY]-[M]-[D]";
  }

  /**
   * 西元年月日，之間以 "-" 間隔，月、日不足兩碼者會在前方補 0。
   * 格式化範例："2025-01-02"
   */
  static get yyyymmddDash() {
    return "[YYYY]-[MM]-[DD]";
  }

  /**
   * 西元日月年，之間以空格間隔，月份為英文縮寫。
   * 格式化範例："2 Jan 2025"
   */
  static get dateAbbrMonthYear() {
    return "[D] [AbbrM] [YYYY]";
  }
}
