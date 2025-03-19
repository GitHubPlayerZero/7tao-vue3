import { SysConstants } from "./sysConstants";
import { PathUtils } from "./pathUtils";

const publicPath = import.meta.env.VITE_IMG_PUBLIC_PATH;
const basePath = PathUtils.append(SysConstants.baseUrl, publicPath);

/**
 * 圖片相關事務處理工具
 */
export class ImageUtils {
  /**
   * 圖片起始存放路徑。
   */
  static get publicPath() {
    return publicPath;
  }

  /**
   * 圖片起始存放區絕對路徑。
   */
  static get basePath() {
    return basePath;
  }

  /**
   * 取得圖片的完整絕對路徑。
   * @param {string} relativePathName 圖片的相對路徑及名稱。
   * @returns {string} 圖片完整的絕對路徑。
   */
  static getImagePath(relativePathName) {
    return PathUtils.append(basePath, relativePathName);
  }
}
