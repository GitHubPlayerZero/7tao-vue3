import { AlertModel } from "./alertModel";

/**
 * 有 confirm button 的訊息窗。
 */
export class ConfirmAlert extends AlertModel {
  /**
   * 顯示成功訊息。
   * @param {string} [msg = ""] 成功訊息，應簡短扼要。
   */
  static async alertSuccess(msg = "") {
    await this.mixTitle(this.successModel, msg).fire();
  }

  /**
   * 顯示警告訊息。
   * @param {string} [msg = ""] 警告訊息，應簡短扼要。
   */
  static async alertWarning(msg = "") {
    await this.mixTitle(this.warningModel, msg).fire();
  }

  /**
   * 顯示警告訊息，會列出標題及說明。
   * @param {string} [msg = ""] 警告訊息，應簡短扼要。
   * @param {string} [detail = ""] 說明。
   */
  static async alertWarningDetail(msg = "", detail = "") {
    await this.mixTitleDesc(this.warningModel, msg, detail).fire();
  }

  /**
   * 顯示錯誤訊息，具有強制注意的效果。
   * @param {string} [msg = ""] 錯誤訊息，應簡短扼要。
   */
  static async alertError(msg = "") {
    await this.mixTitleDesc(this.errorModel, msg).fire();
  }

  /**
   * 顯示錯誤訊息，會列出標題及說明，並具有強制注意的效果。
   * @param {string} [title = ""] 標題，應簡短扼要。
   * @param {string} [detail = ""] 說明。
   */
  static async alertErrorDetail(title = "", detail = "") {
    await this.mixTitleDesc(this.errorModel, title, detail).fire();
  }

  /**
   * 顯示要求登入的訊息。
   * 當接下來要進入的功能需要有登入的權限，在進入之前先做檢核，此可作為檢核不通過的提示。
   */
  static async alertRequiresLogin() {
    await this.mixTitleDesc(this.errorModel, "請先登入", "此功能需要登入才能使用！").fire();
  }
}
