import { AlertParam, AlertCustomClass } from "./alertParam";

/**
 * 訊息窗各種常用設定。
 */
export class AlertComSetting {
  /** 基本設定。 */
  static get base() {
    const setting = new AlertParam();
    setting.position = AlertParam.POSITION_OPTIONS.TOP; // 指定位置於上方置中
    setting.confirmButtonText = "確定"; // Confirm button 所顯示的文字
    return setting;
  }

  /** 成功。 */
  static get success() {
    const setting = AlertComSetting.base;
    setting.icon = AlertParam.ICON_OPTIONS.SUCCESS; // 使用成功的圖示
    return setting;
  }

  /** 警告。 */
  static get warning() {
    const setting = AlertComSetting.base;
    setting.icon = AlertParam.ICON_OPTIONS.WARNING; // 使用警告的圖示
    setting.confirmButtonColor = "var(--bs-warning)"; // 指定 confirm button 的顏色
    setting.confirmButtonText = "好的"; // Confirm button 所顯示的文字
    return setting;
  }

  /** 訊息。 */
  static get info() {
    const setting = AlertComSetting.base;
    setting.icon = AlertParam.ICON_OPTIONS.INFO; // 使用訊息的圖示
    setting.confirmButtonColor = "var(--bs-info)"; // 指定 confirm button 的顏色
    return setting;
  }

  /** 問題。 */
  static get question() {
    const setting = AlertComSetting.base;
    setting.icon = AlertParam.ICON_OPTIONS.QUESTION; // 使用問題的圖示
    return setting;
  }

  /** 錯誤。 */
  static get error() {
    // 用於錯誤訊息的自訂樣式 class
    const customClass = new AlertCustomClass();
    customClass.title = "text-danger";

    const setting = AlertComSetting.base;
    setting.customClass = customClass; // 額外給予自訂的 class
    setting.icon = AlertParam.ICON_OPTIONS.ERROR; // 使用錯誤的圖示
    setting.confirmButtonColor = "var(--bs-danger)"; // 指定 confirm button 的顏色
    setting.confirmButtonText = "我知道了"; // confirm button 所顯示的文字
    return setting;
  }

  /** 鎖定訊息視窗 (不允許使用 ESC 或點擊外部關閉)。 */
  static get lock() {
    const setting = new AlertParam();
    setting.allowOutsideClick = false; // 不允許點擊外部關閉視窗
    setting.allowEscapeKey = false; // 不允許使用 ESC 關閉視窗
    return setting;
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
      ...AlertComSetting.lock.getParamSet(),
      ...AlertComSetting.defocusButton,
    };
  }

  /**
   * Timer。
   * 時間到自動關閉訊息，為短暫的、非強制性的訊息通知。
   * 預設持續時間 1200 毫秒，並且不顯示 confirm button。
   */
  static get timer() {
    const setting = new AlertParam();
    setting.showConfirmButton = false; // 不顯示 confirm button
    setting.timer = 1200; // 持續時間 (毫秒)
    return setting;
  }
}
