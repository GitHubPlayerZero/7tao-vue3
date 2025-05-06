/**
 * 定義 usePagination 回傳內容。
 * @typedef {Object} Pagination
 * @property {import('vue').ComputedRef<Array>} currentDatas 本頁資料，對應本頁頁碼的資料。
 * @property {import('vue').Ref<number>} currentPage 本頁頁碼。
 * @property {number} totalPages 總頁數。
 * @property {number} totalSize 總筆數。
 * @property {number} pageSize 每頁筆數。
 * @property {(pageNo: number) => void} changePage 切換頁面。
 * @property {() => void} goToNextPage 往下一頁。
 * @property {() => void} goToPrevPage 往前一頁。
 */
