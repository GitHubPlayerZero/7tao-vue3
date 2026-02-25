import router from "@/router";
import { CountdownCallbackTimerParam, TimerAlert } from "@/helpers";

/**
 * 倒數計時執行回呼函式的訊息窗（{@link TimerAlert.alertCountdownCallback}）的執行參數，建構時可給入倒數計時的秒數，否則會使用預設值。
 * 1. [timer] 屬性不開放自行設定（即使設定了也會被覆蓋），會依據建構時給入的 [seconds] 換算成毫秒。
 * 2. [html] 屬性不開放自行設定（即使設定了也會被覆蓋），會固定顯示倒數計時內容，可使用 [desc] 屬性作為額外的說明，會以另一個段落顯示於倒數計時的下方。
 * 3. 預設為轉向首頁：
 * 3-1) 回呼函式 [callback] 預設為「使用當前路由導向首頁」的函式。
 * 3-2) 會顯示「立即回首頁」的按鈕（confirmButton）。
 * 3-3) [desc] 內容預設為「即將轉到首頁」。
 *
 * @param {number} [seconds] 倒數計時的秒數，只接受大於 0 的整數，預設值 2 秒。
 * @throws {RangeError} 當 second 不是大於 0 的整數時會拋出錯誤。
 */
export class RedirectorParam extends CountdownCallbackTimerParam {
  /** 預設的重新導向的函式，使用當前路由導向首頁。 */
  static get DEFAULT_REDIRECTION_FUNC() {
    return () => {
      router.push("/");
    };
  }

  // 建構
  constructor(seconds = 2) {
    super(seconds);

    // callback function 預設為重新導向的函式
    this.callback = RedirectorParam.DEFAULT_REDIRECTION_FUNC;

    // 預設內容
    this.desc = "即將轉到首頁。";
    this.showConfirmButton = true;
    this.confirmButtonText = "立即回首頁";
  }
}

/**
 * 頁面導向相關處理。
 */
export class Redirector {
  /**
   * 導頁共用程式。
   * @param {RedirectorParam} param 接收 RedirectorParam。
   */
  static gotoPage(param = new RedirectorParam()) {
    TimerAlert.alertCountdownCallback(param);
  }

  /**
   * 逾期導頁，會顯示已逾期的訊息，時間到會自動執行回呼函式。
   * 當已位於需要有登入權限的頁面，且權限已失效，此可作為逾期的提示，並在稍後轉回首頁（預設）。
   * @param {Function} [redirectionFun] 用於重新導向的回呼函式，預設使用當前路由導向首頁；若為路由守衛呼叫時，須給入自訂的導向函式。
   * @throws {TypeError} 當 [redirectionFun] 不為 Function 時會拋出錯誤。
   */
  static expire(redirectionFun = RedirectorParam.DEFAULT_REDIRECTION_FUNC) {
    const param = new RedirectorParam();
    param.icon = RedirectorParam.ICON_OPTIONS.WARNING;
    param.callback = redirectionFun;
    param.title = "逾期請重新登入";
    Redirector.gotoPage(param);
  }

  /**
   * 登出導頁，會顯示已登出的訊息，時間到會自動執行回呼函式。
   * @param {Function} [redirectionFun] 用於重新導向的回呼函式，預設使用當前路由導向首頁；若為路由守衛呼叫時，須給入自訂的導向函式。
   * @throws {TypeError} 當 [redirectionFun] 不為 Function 時會拋出錯誤。
   */
  static logout(redirectionFun = RedirectorParam.DEFAULT_REDIRECTION_FUNC) {
    const param = new RedirectorParam();
    param.callback = redirectionFun;
    param.title = "已登出";
    Redirector.gotoPage(param);
  }
}
