import Swal from "sweetalert2";

/** 訊息窗各種基礎設定選項。 */
export class AlertOptions {
  /** 基本。 */
  static get base() {
    return {
      position: "top", // 指定位置於上方置中
      confirmButtonText: "確定", // confirm button 所顯示的文字
    };
  }

  /** 成功。 */
  static get success() {
    return {
      icon: "success", // 使用成功的圖示
    };
  }

  /** 錯誤。 */
  static get error() {
    return {
      // 額外給予自訂的 class
      customClass: {
        title: "text-danger",
        // htmlContainer: "text-danger",
      },

      icon: "error", // 使用錯誤的圖示
      confirmButtonColor: "var(--bs-danger)", // 指定 confirm button 的顏色
      confirmButtonText: "我知道了", // confirm button 所顯示的文字
    };
  }

  /** 鎖定訊息視窗 (不允許使用 ESC 或點擊外部關閉)。 */
  static get lock() {
    return {
      allowOutsideClick: false, // 不允許點擊外部關閉視窗
      allowEscapeKey: false, // 不允許使用 ESC 關閉視窗
    };
  }

  /** 開啟訊息視窗後不聚焦任何按鈕，以避免直接使用 Enter 關閉。 */
  static get defocusButton() {
    return {
      // 在 didOpen 生命週期設定聚焦於彈出的視窗，以使按鈕失焦
      didOpen(popup) {
        popup.focus();
      },
    };
  }

  /**
   * 強制注意的訊息窗。
   * 移除可以直接無腦關閉視窗的方法，以提高使用者的注意。
   */
  static get forceFocus() {
    return {
      ...this.lock,
      ...this.defocusButton,
    };
  }

  /**
   * Timer。
   * 時間到自動關閉訊息，為短暫的、非強制性的訊息通知。
   */
  static get timer() {
    return {
      showConfirmButton: false, // 不顯示 confirm button
      timer: 1200, // 持續時間 (毫秒)
    };
  }
}

/** 基礎訊息窗。 */
export class BaseAlert {
  /**
   * 基礎訊息窗。
   */
  static get baseAlert() {
    return Swal.mixin(AlertOptions.base);
  }

  /**
   * 成功訊息窗。
   */
  static get sucessAlert() {
    return this.baseAlert.mixin(AlertOptions.success);
  }

  /**
   * 錯誤訊息窗。
   */
  static get errorAlert() {
    return this.baseAlert.mixin(AlertOptions.error);
  }
}

/** 有 confirm button 的訊息窗。 */
export class ConfirmAlert extends BaseAlert {
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

/** Timer 類型的訊息窗。 */
export class TimerAlert extends BaseAlert {
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
