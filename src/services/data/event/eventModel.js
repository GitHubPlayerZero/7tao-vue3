import { Model } from "../model";
import { EventRecord } from "./eventRecord";

/**
 * 活動資料模型
 */
export class EventModel extends Model {
  /**
   * 活動資料集。
   * @type {EventRecord[]}
   */
  get datas() {
    return this._datas;
  }

  /**
   * 活動資料模型。
   * @param {Object[]} [events] Event 資料集。
   */
  constructor(events = []) {
    super();

    events.forEach((item) => {
      // 轉換資料
      const eventRecord = new EventRecord(item);
      // 建置資料集
      this._datas.push(eventRecord);
    });
  }
}
