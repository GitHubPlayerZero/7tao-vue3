import Swal from "sweetalert2";
import { AlertComSetting } from "./alertComSetting";
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
   * 顯示權限錯誤的訊息。
   */
  static async alertPermissionError() {
    const setting = AlertComSetting.error;
    setting.title = "請先登入";
    setting.text = "此功能需要登入才能使用！";
    Swal.fire(setting.getParamSet());
  }
}
