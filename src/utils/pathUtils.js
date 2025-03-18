/**
 * 路徑處理工具
 */
export class PathUtils {
  /**
   * 銜接兩個路徑。
   * @param {string} startPath - 起始路徑，必須有值。
   * @param {string} subPath - 要銜接的子路徑，必須有值。
   * @returns {string} 銜接完成的路徑。
   */
  static append(startPath, subPath) {
    if (!startPath) {
      throw new Error("參數 [startPath] 必須有值！");
    }
    if (!subPath) {
      throw new Error("參數 [subPath] 必須有值！");
    }

    let path = startPath.endsWith("/") ? startPath : startPath + "/";
    path += subPath.startsWith("/") ? subPath.substring(1) : subPath;
    return path;
  }
}
