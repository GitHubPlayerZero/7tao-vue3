import { TagApi } from "@/api";
import { TagModel } from "./tagModel";
// eslint-disable-next-line no-unused-vars
import { TagRecord } from "./tagRecord";

/**
 * Tag 資料相關邏輯
 */
export class TagService {
  /**
   * 取得所有 Tag 資料。
   * 對應於 {@link TagApi.fetchTags} 的處理。
   * @returns {Object[]} 由後端取回的資料，預設 undefined。
   */
  static async fetchTags() {
    let result;
    await TagApi.fetchTags()
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  /**
   * 準備 Tag 資料模型。
   * @returns {Promise<TagModel>} Tag 資料模型。
   */
  static async prepareTagModel() {
    let tagModel;
    await this.fetchTags().then((res) => {
      tagModel = new TagModel(res);
    });
    return tagModel;
  }

  /**
   * 以名稱搜尋資料，會先使用完全比對，若查無資料再使用模糊比對。
   * @param {TagRecord[]} tags Tag 資料集。
   * @param {string} name 要比對名稱的字串。
   * @returns {TagRecord} 第一個找到的 Tag 資料。
   */
  static searchByName(tags, name) {
    // 完全比對
    let result = tags.find((item) => {
      return item.name === name;
    });

    // 若查無資料
    if (!result) {
      // 模糊比對
      result = tags.find((item) => {
        return item.name.includes(name);
      });
    }

    return result;
  }
}
