import { TypeUtils } from "@/utils";
import { computed, ref } from "vue";

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

/**
 * 依據傳入的資料建立分頁功能。
 * @param {Array} datas 資料集。
 * @param {number} [pageSize] 每頁筆數，預設 10 筆。
 * @returns {Pagination} 分頁相關資訊與方法。
 * @throws 若 datas、pageSize 有問題會拋出錯誤。
 */
export function usePagination(datas, pageSize = 10) {
  // 檢核 datas
  if (!(datas instanceof Array)) {
    throw Error("[datas] 必須使用陣列！");
  }

  // 檢核 pageSize 並確保為數值
  pageSize = TypeUtils.converToNumber(pageSize);

  /**
   * @type {number} 總筆數。
   */
  const totalSize = datas.length;

  /**
   * @type {number} 總頁數。
   */
  let totalPages = Math.ceil(totalSize / pageSize);

  /**
   * @type {import('vue').Ref<number>} 本頁頁碼，初始預設為 1（第 1 頁）。
   */
  let currentPage = ref(1);

  /**
   * @type {import('vue').ComputedRef<Array>} 本頁資料，對應本頁頁碼的資料。
   */
  const currentDatas = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = currentPage.value * pageSize;
    return datas.slice(startIndex, endIndex);
  });

  /**
   * 切換頁面。
   * @param {number} pageNo 頁碼。
   * @throws 若 pageNo 不正確會拋出錯誤。
   */
  function changePage(pageNo) {
    // 檢核 pageNo 型別並確保為數值
    pageNo = TypeUtils.converToNumber(pageNo);

    // 檢核 pageNo 有效性
    if (pageNo < 1 || pageNo > totalPages) {
      throw Error(`[pageNo] 頁碼應介於 1 ~ ${totalPages} 之間！`);
    }

    // 改變本頁頁碼為 pageNo
    currentPage.value = pageNo;
  }

  /**
   * 往下一頁。
   */
  function goToNextPage() {
    const nextPage = currentPage.value + 1;
    if (nextPage <= totalPages) {
      currentPage.value = nextPage;
    }
  }

  /**
   * 往前一頁。
   */
  function goToPrevPage() {
    const prevPage = currentPage.value - 1;
    if (prevPage >= 1) {
      currentPage.value = prevPage;
    }
  }

  return {
    currentDatas,
    currentPage,
    totalPages,
    totalSize,
    pageSize,
    changePage,
    goToNextPage,
    goToPrevPage,
  };
}
