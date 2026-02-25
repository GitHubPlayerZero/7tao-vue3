import { EventApi } from "@/api";
import { ErrorHelper } from "@/helpers";

/**
 * 相簿資料相關邏輯
 */
export class AlbumService {
  /**
   * 取得所有相簿，預設以日期由近至遠排序。
   * 對應於 {@link EventApi.fetchAlbums} 的處理。
   * @returns {Promise<object[]>} 由後端取回的資料，預設空陣列。
   */
  static async fetchAlbums() {
    let result;
    await EventApi.fetchAlbums()
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(`[fetchAlbums] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      });
    return result || [];
  }
}
