import { Model } from "../model";
import { BannerRecord } from "./bannerRecord";

/**
 * Banner 資料模型
 */
export class BannerModel extends Model {
  /**
   * Banner 資料集。
   * @type {BannerRecord[]}
   */
  get datas() {
    return this._datas;
  }

  /**
   * Banner 資料模型。
   * @param {Object[]} [events] Event 資料集。
   */
  constructor(events = []) {
    super();

    events.forEach((item) => {
      // 轉換資料
      const bannerRecord = new BannerRecord(item);
      // 建置資料集
      this._datas.push(bannerRecord);
    });
  }
}
