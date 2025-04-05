import { Model } from "../model";
import { EventTagRecord } from "./eventTagRecord";
import { TagModel } from "../tag";
import { EventService } from "./eventService";

/**
 * Event 資料模型，會整合 Tag 資料。
 */
export class EventTagModel extends Model {
  /**
   * Event 資料集。
   * @type {EventTagRecord[]}
   */
  get datas() {
    return this._datas;
  }

  /**
   * Event 資料模型，會整合 Tag 資料。
   * @param {Object[]} events Event 資料集。
   * @param {TagModel} tagModel Tag 資料模型。
   */
  constructor(events, tagModel) {
    super();

    // 檢核 events
    if (!Array.isArray(events)) {
      throw Error("[events] 不正確！");
    }

    // 檢核 tagModel
    if (!TagModel.isMe(tagModel)) {
      throw Error("[tagModel] 不正確！");
    }

    // 整理資料
    events.forEach((item) => {
      // 轉換資料
      const eventTagRecord = new EventTagRecord(item, tagModel);
      // 建置資料集
      this._datas.push(eventTagRecord);
    });
  }

  /**
   * 以 Tag ID 篩選出活動。
   * @param {number[]} tagIds 用來篩選的 Tag ID 集合。
   * @returns {EventTagRecord[]} 篩選後的活動。
   */
  filterByTagIds(tagIds) {
    return EventService.filterByTagIds(this.datas, tagIds);
  }
}
