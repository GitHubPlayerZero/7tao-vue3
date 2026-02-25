/**
 * 活動詳細資訊頁面的路由推入配置。
 * @typedef {Object} EventDetailRouterPushConfig
 * @property {string} path - 路由路徑。
 * @property {Object} state - 路由狀態物件。
 * @property {string} state.eventTitle - 儲存在 history state 中的活動標題。
 */

/**
 * 活動詳細資訊頁面的路由處理工具集合。
 * @typedef {Object} EventDetailRouterTools
 * @property {Function} goToEventDetailPage - 導航至活動詳情頁面。接收活動資訊物件，其中包含 id 和 title。
 */
