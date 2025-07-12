/**
 * 訊息窗各種基礎設定選項。
 */
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

  /** 警告。 */
  static get warning() {
    return {
      icon: "warning", // 使用警告的圖示
      confirmButtonColor: "var(--bs-warning)", // 指定 confirm button 的顏色
      confirmButtonText: "好的",
    };
  }

  /** 訊息。 */
  static get info() {
    return {
      icon: "info", // 使用訊息的圖示
      confirmButtonColor: "var(--bs-info)", // 指定 confirm button 的顏色
    };
  }

  /** 問題。 */
  static get question() {
    return {
      icon: "question", // 使用問題的圖示
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
