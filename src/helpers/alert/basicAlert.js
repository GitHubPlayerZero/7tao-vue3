import Swal from "sweetalert2";
import { AlertOptions } from "./alertOptions";

/**
 * 各種基本的訊息窗。
 */
export class BasicAlert {
  /** 基礎訊息窗。 */
  static get baseAlert() {
    return Swal.mixin(AlertOptions.base);
  }

  /** 成功訊息窗。 */
  static get sucessAlert() {
    return this.baseAlert.mixin(AlertOptions.success);
  }

  /** 錯誤訊息窗。 */
  static get errorAlert() {
    return this.baseAlert.mixin(AlertOptions.error);
  }

  /** 警告訊息窗。 */
  static get warningAlert() {
    return this.baseAlert.mixin(AlertOptions.warning);
  }

  /** 資訊訊息窗。 */
  static get infoAlert() {
    return this.baseAlert.mixin(AlertOptions.info);
  }

  /** 問題訊息窗。 */
  static get questionAlert() {
    return this.baseAlert.mixin(AlertOptions.question);
  }
}
