import { HistoryStateHelper } from "@/helpers";

/**
 * 活動詳細資訊頁面的路由工具。
 */
export class EventDetailRouterTool {
  /** 路由基礎路徑 */
  static #basePath = "/events/";

  /** 路由路徑 */
  static routePath = `${this.#basePath}:id`;

  /** 路由名稱 */
  static routeName = "eventDetail";

  /** 活動標題在 history state 中的名稱 */
  static hisStateEventTitle = "eventTitle";

  /**
   * 根據活動 ID 取得路由路徑。
   * @param {string|number} id 活動 ID。
   * @returns {string} 路由路徑。
   */
  static getRoutePathById(id) {
    return `${this.#basePath}${id}`;
  }

  /**
   * 獲取路由推入配置。
   * @param {Object} event - 活動資訊。
   * @param {number|string} event.id - 活動的唯一識別碼。
   * @param {string} event.title - 活動標題。
   * @returns {EventDetailRouterPushConfig} 路由推入配置。
   */
  static getRouterPushConfig(event) {
    return {
      path: this.getRoutePathById(event.id),
      state: { [this.hisStateEventTitle]: event.title }, // 將活動標題存入瀏覽器歷史狀態中
    };
  }

  /**
   * 取得活動標題。
   * @returns {string|undefined} 返回儲存在 history state 中的活動標題，若無則返回 undefined。
   */
  static getEventTitle() {
    return HistoryStateHelper.getData(this.hisStateEventTitle);
  }
}
