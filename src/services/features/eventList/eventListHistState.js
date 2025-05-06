import { TypeUtils, HistoryStateHelper } from "@/helpers";

/**
 * 處理 Event list 頁面的 history state 相關事宜。
 */
export class EventListHistState {
  /**
   * 標籤資料在 history state 中的名稱。
   * @type {string}
   */
  static #tagStateName = "tags";

  /**
   * 頁碼資料在 history state 中的名稱。
   * @type {string}
   */
  static #pageStateName = "page";

  /**
   * 創建使用於 history state 的標籤資料。
   * @param {number[] | number} [tagIds] 標籤 ID，可以是多個 ID 陣列或單一個 ID，預設為空陣列。
   * @returns {{tags: number[]}} 標籤資料物件。會存放標籤 ID 陣列集合，若沒有標籤 ID 則會存放空陣列。
   */
  static createTagData(tagIds = []) {
    // 初始標籤資料為空陣列
    const tagData = [];

    // 若參數不為陣列則先包成陣列
    if (!(tagIds instanceof Array)) {
      tagIds = [tagIds];
    }

    // 處理參數陣列裡每個值
    tagIds.forEach((tagId) => {
      // 為數字才會加入標籤資料中
      try {
        tagData.push(TypeUtils.converToNumber(tagId));
      } catch {
        /* no process */
      }
    });

    return { [this.#tagStateName]: tagData };
  }

  /**
   * 創建使用於 history state 的頁碼資料。
   * @param {number} [pageNo] 頁碼，預設為第 1 頁。
   * @returns {{page: number}} 頁碼資料物件。
   * @throws 若不是正常的數字格式則會拋出錯誤訊息。
   */
  static createPageData(pageNo = 1) {
    pageNo = TypeUtils.converToNumber(pageNo);
    return { [this.#pageStateName]: pageNo };
  }

  /**
   * 由 history state 取得標籤資料。
   * @returns {number[]} 標籤 ID 集合，若不存在則會回傳空陣列。
   */
  static getTagData() {
    return HistoryStateHelper.getData(this.#tagStateName) || [];
  }

  /**
   * 由 history state 取得頁碼資料。
   * @returns {number} 頁碼，若不存在則會回傳第 1 頁。
   */
  static getPageData() {
    return HistoryStateHelper.getData(this.#pageStateName) || 1;
  }

  /**
   * 修改 history state 的標籤資料。
   * @param {number[] | number} [tagIds] 標籤 ID，可以是多個 ID 陣列或單一個 ID，預設為空陣列。
   */
  static updateTagData(tagIds = []) {
    HistoryStateHelper.updateData(this.createTagData(tagIds));
  }

  /**
   * 修改 history state 的頁碼資料。
   * @param {number} [pageNo] 頁碼，預設為第 1 頁。
   * @throws 若不是正常的數字格式則會拋出錯誤訊息。
   */
  static updatePageData(pageNo) {
    HistoryStateHelper.updateData(this.createPageData(pageNo));
  }
}
