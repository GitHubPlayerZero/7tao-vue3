import { EventRecord } from "./eventRecord";
import { EventService } from "./eventService";
import { TagModel } from "../tag";
import { TypeUtils } from "@/helpers";

/**
 * Event 單筆資料，會整合 Tag 資料。
 */
export class EventTagRecord extends EventRecord {
  /**
   * 所有分類標籤完整資料。
   * @type {TagObj[]}
   */
  tagDatas = [];

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

    // 建置標籤相關資料
    if (TagModel.isMe(tagModel) && TypeUtils.isArrayWithItems(this.tags)) {
      this.tags.forEach((tagId, index) => {
        const tagObj = tagModel.createTagObj(tagId);

        // 所有分類標籤完整資料
        this.tagDatas.push(tagObj);

        // 主分類標籤
        if (index === EventService.mainTagIndex) {
          this.mainTag = tagObj;
        }
        // 次分類標籤
        else {
          this.subTags.push(tagObj);
        }
      });
    }
    // 建置標籤相關資料 end
  }
  // constructor end
}
