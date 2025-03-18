import { SysConstants } from "./sysConstants";
import { PathUtils } from "./pathUtils";

const basicPath = import.meta.env.VITE_IMG_BASIC_PATH;
const basicUrl = PathUtils.append(SysConstants.projectUrl, basicPath);

/**
 * 圖片相關事務處理工具
 */
export class ImageUtils {
  /**
   * 圖片起始存放路徑。
   */
  static get basicPath() {
    return basicPath;
  }

  /**
   * 圖片起始存放區 URL。
   */
  static get basicUrl() {
    return basicUrl;
  }

  /**
   * 取得基礎圖片的完整 URL。
   * @param {string} relativePathName 圖片的相對路徑及名稱。
   * @returns {string} 圖片完整的 URL 路徑。
   */
  static getBaseUrl(relativePathName) {
    return PathUtils.append(basicUrl, relativePathName);
  }
}
