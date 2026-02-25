import { ref } from "vue";
import { TypeUtils } from "@/helpers";

/**
 * 計時器。
 * @param {number} seconds 初始秒數。
 * @param {Function} [callbackFun] 當計時結束時要執行的函數，若不給入則不執行任何動作。
 * @returns {Timer} 計時器相關資訊與方法。
 * @throws {TypeError} seconds 參數若不為有效數字則拋出例外。
 */
export function useTimer(seconds, callbackFun) {
  if (!TypeUtils.isValidNumberFormat(seconds)) {
    throw TypeError(`[seconds] 參數內容 (${seconds}) 為不正確的數字格式！`);
  }

  const countdown = ref(TypeUtils.converToNumber(seconds)); // 初始秒數

  // 檢查 callbackFun 是否為函數，若不是則設為空函數
  if (typeof callbackFun !== "function") {
    callbackFun = () => {};
  }

  let timerId; // 計時器 ID

  /**
   * 啟動計時器，每秒遞減。
   */
  function start() {
    timerId = setInterval(() => {
      if (--countdown.value <= 0) {
        callbackFun();
      }
    }, 1000);
  }

  /**
   * 清除計時器。
   */
  function clear() {
    clearInterval(timerId);
  }

  return { countdown, start, clear };
}
