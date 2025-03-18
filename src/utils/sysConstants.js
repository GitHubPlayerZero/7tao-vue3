import { PathUtils } from "./pathUtils";

const rootUrl = new URL("/", location.href).href;
const baseUrl = import.meta.env.BASE_URL;
const projectUrl = PathUtils.append(rootUrl, baseUrl);

/**
 * 系統共用常數
 */
export class SysConstants {
  /**
   * 根 URL。
   */
  static get rootUrl() {
    return rootUrl;
  }

  /**
   * 基礎 URL。
   */
  static get baseUrl() {
    return baseUrl;
  }

  /**
   * 專案基礎 URL。
   */
  static get projectUrl() {
    return projectUrl;
  }
}
