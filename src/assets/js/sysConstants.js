import { PathProcesser } from "./pathProcesser";

const rootUrl = new URL("/", location.href).href;
const baseUrl = import.meta.env.BASE_URL;
const projectUrl = PathProcesser.append(rootUrl, baseUrl);

const imgBasePath = import.meta.env.VITE_IMG_BASE_PATH;
const imgEventPath = import.meta.env.VITE_IMG_EVENT_PATH;
const imgAlbumPath = import.meta.env.VITE_IMG_ALBUM_PATH;
const imgBaseUrl = PathProcesser.append(projectUrl, imgBasePath);
const imgEventUrl = PathProcesser.append(imgBaseUrl, imgEventPath);
const imgAlbumUrl = PathProcesser.append(imgBaseUrl, imgAlbumPath);

/**
 * 系統共用常數。
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

  /**
   * 圖片存放路徑。
   */
  static get imgBasePath() {
    return imgBasePath;
  }

  /**
   * 圖片存放區 URL。
   */
  static get imgBaseUrl() {
    return imgBaseUrl;
  }

  /**
   * Event 圖片存放區 URL。
   */
  static get imgEventUrl() {
    return imgEventUrl;
  }

  /**
   * Album 圖片存放區 URL。
   */
  static get imgAlbumUrl() {
    return imgAlbumUrl;
  }
}
