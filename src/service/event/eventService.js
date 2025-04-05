import { EventApi } from "@/api";
import { BannerModel } from "./bannerModel";
import { EventTagModel } from "./eventTagModel";
// eslint-disable-next-line no-unused-vars
import { EventTagRecord } from "./eventTagRecord";
import { TagModel } from "../tag";

/**
 * Event 資料相關邏輯
 */
export class EventService {
  /**
   * 主分類標籤的 index，預設以第一個標籤為主要分類。
   */
  static get mainTagIndex() {
    return 0;
  }

  /**
   * 取得所有未過期活動，預設以日期由近至遠排序。
   * 對應於 {@link EventApi.fetchEvents} 的處理。
   * @returns {Array} 由後端取回的資料，預設 undefined。
   */
  static async fetchEvents() {
    let result;
    await EventApi.fetchEvents()
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  /**
   * 取得 Banner 活動，預設以日期由近至遠排序。
   * 對應於 {@link EventApi.fetchBanners} 的處理。
   * @returns {Array} 由後端取回的資料，預設 undefined。
   */
  static async fetchBanners() {
    let result;
    await EventApi.fetchBanners()
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  /**
   * 準備 Banner 資料模型。
   * @returns {Promise<BannerModel>} Banner 資料模型。
   */
  static async prepareBannerModel() {
    let bannerModel;
    await this.fetchBanners().then((res) => {
      bannerModel = new BannerModel(res);
    });
    return bannerModel;
  }

  /**
   *  準備 Event 資料模型，會整合 Tag 資料。
   * @param {TagModel} tagModel TagModel。
   * @returns {Promise<EventTagModel>} Event 資料模型。
   */
  static async prepareEventTagModel(tagModel) {
    // 檢核 tagModel
    if (!TagModel.isMe(tagModel)) {
      throw Error("[tagModel] 不正確！");
    }

    let eventTagModel;
    await this.fetchEvents().then((res) => {
      eventTagModel = new EventTagModel(res, tagModel);
    });
    return eventTagModel;
  }

  /**
   * 以 Tag ID 篩選出活動。
   * @param {EventTagRecord[]} events 活動資料集合。
   * @param {number[]} tagIds 用來篩選的 Tag ID 集合。
   * @returns {EventTagRecord[]} 篩選後的活動。
   */
  static filterByTagIds(events, tagIds) {
    // 沒有篩選的 Tag ID 則直接回傳所有資料
    if (!tagIds || tagIds.length <= 0) {
      return events;
    }

    return events.filter((event) => {
      for (const id of event.tags) {
        if (tagIds.includes(id)) {
          return true;
        }
      }
      return false;
    });
  }
}
