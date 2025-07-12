import { AlertOptions } from "./alertOptions";
import { BasicAlert } from "./basicAlert";

/**
 * 有 confirm button 的訊息窗。
 */
export class ConfirmAlert extends BasicAlert {
  /**
   * 顯示成功訊息。
   * @param {string} [msg = ""] 成功訊息，應簡短扼要。
   * @param {Object} [options = {}] 可另外給予自訂的 SweetAlert2 的設定。
   */
  static alertSuccess(msg = "", options = {}) {
    this.sucessAlert.fire({
      ...options,
      title: msg,
    });
  }

  /**
   * 顯示警告訊息。
   * @param {string} [msg = ""] 警告訊息，應簡短扼要。
   * @param {Object} [options = {}] 可另外給予自訂的 SweetAlert2 的設定。
   */
  static alertWarning(msg = "", options = {}) {
    this.warningAlert.fire({
      ...options,
      title: msg,
    });
  }

  /**
   * 顯示警告訊息，會列出標題及說明。
   * @param {string} [msg = ""] 警告訊息，應簡短扼要。
   * @param {string} [detail = ""] 說明。
   * @param {Object} [options = {}] 可另外給予自訂的 SweetAlert2 的設定。
   */
  static alertWarningDetail(msg = "", detail = "", options = {}) {
    this.warningAlert.fire({
      ...options,
      title: msg,
      text: detail,
    });
  }

  /**
   * 顯示錯誤訊息，具有強制注意的效果。
   * @param {string} [msg = ""] 錯誤訊息，應簡短扼要。
   * @param {Object} [options = {}] 可另外給予自訂的 SweetAlert2 的設定。
   */
  static alertError(msg = "", options = {}) {
    this.errorAlert.fire({
      ...AlertOptions.forceFocus,
      ...options,
      title: msg,
    });
  }

  /**
   * 顯示錯誤訊息，會列出標題及說明，並具有強制注意的效果。
   * @param {string} [title = ""] 標題，應簡短扼要。
   * @param {string} [detail = ""] 說明。
   * @param {Object} [options = {}] 可另外給予自訂的 SweetAlert2 的設定。
   */
  static alertErrorDetail(title = "", detail = "", options = {}) {
    this.errorAlert.fire({
      ...AlertOptions.forceFocus,
      ...options,
      title: title,
      text: detail,
    });
  }
}

/**
 * Timer 類型的訊息窗。
 */
export class TimerAlert extends BasicAlert {
  /**
   * 顯示成功訊息，時間到會自動關閉訊息窗。
   * @param {string} [msg = ""] 成功訊息，應簡短扼要。
   * @param {Object} [options = {}] 可另外給予自訂的 SweetAlert2 的設定。
   */
  static alertSuccess(msg = "", options = {}) {
    this.sucessAlert.fire({
      ...AlertOptions.timer,
      ...options,
      title: msg,
    });
  }

  /**
   * 顯示錯誤訊息，時間到會自動關閉訊息窗。
   * @param {string} [msg = ""] 錯誤訊息，應簡短扼要。
   * @param {Object} [options = {}] 可另外給予自訂的 SweetAlert2 的設定。
   */
  static alertError(msg = "", options = {}) {
    this.errorAlert.fire({
      ...AlertOptions.timer,
      ...options,
      title: msg,
    });
  }
}
