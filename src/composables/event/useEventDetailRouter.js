import router from "@/router";
import { EventDetailRouterTool } from "@/services/features";

/**
 * 活動詳細資訊頁面的路由處理。
 * @returns {EventDetailRouterTools} 相關路由工具。
 */
export function useEventDetailRouter() {
  /**
   * 導航至活動詳細資訊頁面。
   * @param {Object} event - 活動資訊。
   * @param {number|string} event.id - 活動的唯一識別碼。
   * @param {string} event.title - 活動標題。
   */
  function goToEventDetailPage(event) {
    router.push(EventDetailRouterTool.getRouterPushConfig(event));
  }

  return {
    goToEventDetailPage,
  };
}
