import { PathUtils } from "./pathUtils";

const rootUrl = new URL("/", location.href).href;
const baseUrl = import.meta.env.BASE_URL;
const projectUrl = PathUtils.append(rootUrl, baseUrl);

const scrollWaitingTime = import.meta.env.VITE_SCROLL_WAITING_TIME;

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
}
