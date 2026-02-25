import { PathUtils } from "./pathUtils";
import { TypeUtils } from "./typeUtils";

const rootUrl = new URL("/", location.href).href;
const baseUrl = import.meta.env.BASE_URL;
const projectUrl = PathUtils.append(rootUrl, baseUrl);

// Router scrollBehavior 等待時間（毫秒）
let scrollWaitingTime = import.meta.env.VITE_SCROLL_WAITING_TIME;
if (!TypeUtils.isValidNumberFormat(scrollWaitingTime)) {
  scrollWaitingTime = "0";
  console.warn(`環境變數 VITE_SCROLL_WAITING_TIME 必須為數字，已設為預設值 0。`);
}

// 公用圖片存放路徑
const imgPublicPath = import.meta.env.VITE_IMG_PUBLIC_PATH;
if (!TypeUtils.isStringWithValue(imgPublicPath)) {
  throw new TypeError(`環境變數 VITE_IMG_PUBLIC_PATH 不得為空！`);
}

// API 基礎 URL
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
if (!TypeUtils.isStringWithValue(apiBaseUrl)) {
  throw new TypeError(`環境變數 VITE_API_BASE_URL 不得為空！`);
}

// token 名稱
const cookieTokenName = import.meta.env.VITE_COOKIE_TOKEN_NAME;
if (!TypeUtils.isStringWithValue(cookieTokenName)) {
  throw new TypeError(`環境變數 VITE_COOKIE_TOKEN_NAME 不得為空！`);
}

// token 有效時間（秒）
const cookieTokenTime = import.meta.env.VITE_COOKIE_TOKEN_TIME;
if (!TypeUtils.isValidNumberFormat(cookieTokenTime)) {
  throw new TypeError(`環境變數 VITE_COOKIE_TOKEN_TIME 必須為數字！`);
}

/**
 * 系統共用常數
 */
export class SysConstants {
  /**
   * 根 URL。
   * @type {string}
   */
  static get rootUrl() {
    return rootUrl;
  }

  /**
   * 基礎 URL。
   * @type {string}
   */
  static get baseUrl() {
    return baseUrl;
  }

  /**
   * 專案基礎 URL。
   * @type {string}
   */
  static get projectUrl() {
    return projectUrl;
  }

  /**
   * scrollBehavior 等待時間（毫秒）。
   * @type {number}
   */
  static get scrollWaitingTime() {
    return scrollWaitingTime;
  }

  /**
   * 公用圖片存放路徑。
   * @type {string}
   */
  static get imgPublicPath() {
    return imgPublicPath;
  }

  /**
   * API 基礎 URL。
   * @type {string}
   */
  static get apiBaseUrl() {
    return apiBaseUrl;
  }

  /**
   * Token 存放在 Cookie 中的名稱。
   * @type {string}
   */
  static get cookieTokenName() {
    return cookieTokenName;
  }

  /**
   * Token 存放在 Cookie 中的有效時間（秒）。
   * @type {string}
   */
  static get cookieTokenTime() {
    return cookieTokenTime;
  }
}
