import { EventRecord } from "./eventRecord";
import { EventService } from "./eventService";
// eslint-disable-next-line no-unused-vars
import { TagModel } from "../tag";

/**
 * Event 單筆資料，會整合 Tag 資料。
 */
export class EventTagRecord extends EventRecord {
  /**
   * 定義標籤物件內容。
   * @typedef {Object} TagObj
   * @property {number} id 標籤 ID。
   * @property {string} name 標籤名稱。
   */

  /**
   * 主分類標籤。
   * @type {TagObj}
   */
  mainTag;
  /**
   * 其它次要分類標籤。
   * @type {TagObj[]}
   */
  subTags = [];

  /**
   * Event 單筆資料，會整合 Tag 資料。
   * @param {Object} data Event 資料。
   * @param {TagModel} tagModel Tag 資料模型。
   */
  constructor(data, tagModel) {
    super(data);

    if (data && tagModel) {
      // 建置主分類標籤資料
      const mainTagId = this.tags[EventService.mainTagIndex]; // 主分類標籤 ID
      this.mainTag = tagModel.createTagObj(mainTagId);

      // 建置次分類標籤資料
      const subTagIds = this.tags.slice(EventService.mainTagIndex + 1); // 次分類標籤 ID
      subTagIds.forEach((tagId) => {
        this.subTags.push(tagModel.createTagObj(tagId));
      });
    }
    // if (data && tagModel) end
  }
  // constructor end
}
