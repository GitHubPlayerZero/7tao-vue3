/**
 * Cookie 資料。
 */
export class Cookie {
  /** Cookie 名稱。 */
  #name = "";

  /** Cookie 的值 */
  #value = "";

  /** Cookie 最長存活時間（秒） */
  #maxAge = null;

  /** Cookie 過期時間 */
  #expires = null;

  /** Cookie 所屬網域 */
  #domain = null;

  /** Cookie 所屬路徑 */
  #path = null;

  /** 是否為安全 Cookie（僅透過 HTTPS 傳輸） */
  #secure = null;

  /**
   * 建立 Cookie 資料實例。
   * @param {string} name Cookie 名稱。
   * @throws {TypeError} 若未提供名稱則拋出錯誤。
   */
  constructor(name) {
    if (!name) {
      throw new TypeError("必須提供 Cookie 名稱！");
    }
    this.#name = name;
  }

  /**
   * 設定 Cookie 的值。
   * @param {string} value Cookie 的值。
   */
  setValue(value) {
    this.#value = value;
  }

  /**
   * 設定 Cookie 最長存活時間（秒）。
   * @param {number} maxAge 最長存活時間（秒）
   */
  setMaxAge(maxAge) {
    this.#maxAge = maxAge;
  }

  /**
   * 設定 Cookie 過期時間。
   * @param {Date} expires 過期時間。
   */
  setExpires(expires) {
    this.#expires = expires;
  }

  /**
   * 設定 Cookie 所屬網域。
   * @param {string} domain 網域。
   */
  setDomain(domain) {
    this.#domain = domain;
  }

  /**
   * 設定 Cookie 所屬路徑。
   * @param {string} path 路徑。
   */
  setPath(path) {
    this.#path = path;
  }

  /**
   * 是否設定為安全 Cookie（僅透過 HTTPS 傳輸）。
   * @param {boolean} bool true 代表要設定為安全 Cookie。
   */
  isSecure(bool) {
    if (bool) {
      this.#secure = "secure";
    } else {
      this.#secure = null;
    }
  }

  /**
   * 將 Cookie 轉成字串。
   * @returns {string} Cookie 字串。
   */
  toString() {
    let str = `${encodeURIComponent(this.#name)}=${encodeURIComponent(this.#value)}`;

    // 使用寬鬆比對（!=）以同時避免 null 及 undefined
    if (this.#maxAge != null) {
      str += `; max-age=${this.#maxAge}`;
    }

    if (this.#expires != null) {
      str += `; expires=${this.#expires.toUTCString()}`;
    }

    if (this.#domain != null) {
      str += `; domain=${this.#domain}`;
    }

    if (this.#path != null) {
      str += `; path=${this.#path}`;
    }

    if (this.#secure != null) {
      str += `; ${this.#secure}`;
    }

    return str;
  }
}
