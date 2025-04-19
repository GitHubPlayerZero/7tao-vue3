import { EventApi } from "@/api";
// eslint-disable-next-line no-unused-vars
import { EventTagRecord } from "./eventTagRecord";
import { TypeUtils } from "@/helpers";

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
   * @returns {Promise<Object[]>} 由後端取回的資料，預設空陣列。
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
    return result || [];
  }

  /**
   * 取得單一活動資訊。
   * 對應於 {@link EventApi.fetchEventInfo} 的處理。
   * @param {number} id 活動 ID。
   * @returns {Promise<Object>} 由後端取回的資料，預設空物件。
   */
  static async fetchEventInfo(id) {
    let result;
    await EventApi.fetchEventInfo(id)
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return result || {};
  }

  /**
   * 取得 Banner 活動，預設以日期由近至遠排序。
   * 對應於 {@link EventApi.fetchBanners} 的處理。
   * @returns {Promise<Object[]>} 由後端取回的資料，預設空陣列。
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
    return result || [];
  }

  /**
   * 以 Tag ID 篩選出活動。
   * @param {EventTagRecord[]} events 活動資料集合。
   * @param {number[]} tagIds 用來篩選的 Tag ID 集合。
   * @returns {EventTagRecord[]} 篩選後的活動。
   */
  static filterByTagIds(events, tagIds) {
    // 檢核 events：不是有資料的陣列，直接回傳空陣列
    if (!TypeUtils.isArrayWithItems(events)) {
      return [];
    }

    // 檢核 tagIds：不是有資料的陣列，直接回傳所有資料
    if (!TypeUtils.isArrayWithItems(tagIds)) {
      return events;
    }

    // 依據標籤進行活動篩選
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
