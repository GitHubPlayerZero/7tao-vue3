import { Api } from "./api";

/**
 * Tag 相關資料處理
 */
export class TagApi extends Api {
  static #tagUrl = "/tags";

  /**
   * 取得所有 tag 資料。
   * @returns {Promise} 由後端取回的資料。
   */
  static async fetchTags() {
    let result;

    await this._axios
      .get(`${this.#tagUrl}`)
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });

    return result;
  }

  /**
   * 整理成以 tag ID 為鍵項的鍵值對應資料。
   * @param {Array} tags 資料。
   * @returns {Object} 以 tag ID 為鍵項的鍵值資料集合 {id: name}。
   */
  static getIdMap(tags) {
    const idMap = tags.reduce((map, item) => {
      map[item.id] = item.name;
      return map;
    }, {});

    return idMap;
  }

  /**
   * 以名稱搜尋資料，會先使用完全比對，若查無資料再使用模糊比對。
   * @param {string} str 要比對名稱的字串。
   * @returns {Object} 第一個找到的 tag 資料。
   */
  static searchByName(tags, str) {
    // 完全比對
    let result = tags.find((item) => {
      return item.name === str;
    });

    // 若查無資料
    if (!result) {
      // 模糊比對
      result = tags.find((item) => {
        return item.name.includes(str);
      });
    }

    return result;
  }
}
