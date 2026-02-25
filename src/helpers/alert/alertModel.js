import Swal from "sweetalert2";
import { AlertParam } from "./alertParam";
import { AlertComSetting } from "./alertComSetting";
import { TypeUtils } from "../typeUtils";

/**
 * 各種基本的訊息窗。
 */
export class AlertModel {
  /** 基礎訊息窗。 */
  static get baseModel() {
    return Swal.mixin(AlertComSetting.base.getParamSet());
  }

  /** 成功訊息窗。 */
  static get successModel() {
    return this.baseModel.mixin(AlertComSetting.success.getParamSet());
  }

  /** 錯誤訊息窗。 */
  static get errorModel() {
    return this.baseModel
      .mixin(AlertComSetting.error.getParamSet())
      .mixin(AlertComSetting.forceFocus);
  }

  /** 警告訊息窗。 */
  static get warningModel() {
    return this.baseModel.mixin(AlertComSetting.warning.getParamSet());
  }

  /** 資訊訊息窗。 */
  static get infoModel() {
    return this.baseModel.mixin(AlertComSetting.info.getParamSet());
  }

  /** 問題訊息窗。 */
  static get questionModel() {
    return this.baseModel.mixin(AlertComSetting.question.getParamSet());
  }

  /**
   * 若有提供 SweetAlert2 實例，則將之與新設定混合，否則建立一個新的 SweetAlert2 實例。
   * @param {AlertParam | SweetAlertOptions} setting - 要混入的參數物件或 AlertParam 實例。
   * @param {undefined | SweetAlert2} [swal] - 已存在的 SweetAlert2 實例，若不提供或無效，則會建立一個新的 SweetAlert2 實例。
   * @returns {SweetAlert2} - 回傳混合後的 SweetAlert2 實例，可直接使用 .fire(...) 等方法。
   * @throws {TypeError} - 當 setting 不是 AlertParam 實例或有效的參數物件時，會拋出錯誤。
   */
  static getMixinModel(setting, swal) {
    let mixSetting = setting;

    // 若 setting 為 AlertParam 的實例，則取其回傳值作為 mixin 設定
    if (setting instanceof AlertParam) {
      mixSetting = setting.getParamSet();
    }
    // 檢核最終的 mixSetting 必須為物件
    else if (!TypeUtils.isExactObject(mixSetting)) {
      throw new TypeError("[setting] 必須為 AlertParam 實例，或是 SweetAlert2 的設定參數物件！");
    }

    // 檢查 swal 是否為 SweetAlert2 實例（以是否有 mixin 方法做為判斷）
    if (typeof swal?.mixin === "function") {
      return swal.mixin(mixSetting);
    }

    return Swal.mixin(mixSetting);
  }

  /**
   * 將標題與文字說明 混合 既有的 SweetAlert2 實例，回傳一個新的 SweetAlert2 實例（mixin 後的物件）。
   * @param {SweetAlert2} swal - 已存在的 SweetAlert2 實例（例如 Swal.mixin() 回傳值）。
   * @param {undefined | string} title - 要設定的標題。
   * @param {undefined | string} desc - 要設定的文字說明。
   * @returns {SweetAlert2} - 回傳 mixin 後的 SweetAlert2 實例，可直接使用 .fire(...) 等方法。
   */
  static mixTitleDesc(swal, title, desc) {
    const param = new AlertParam();
    param.titleText = title;
    param.text = desc;
    return this.getMixinModel(param, swal);
  }

  /**
   * 將 標題 混合 既有的 SweetAlert2 實例，回傳一個新的 SweetAlert2 實例（mixin 後的物件）。
   * @param {SweetAlert2} swal - 已存在的 SweetAlert2 實例（例如 Swal.mixin() 回傳值）。
   * @param {undefined | string} title - 要設定的標題。
   * @returns {SweetAlert2} - 回傳 mixin 後的 SweetAlert2 實例，可直接使用 .fire(...) 等方法。
   */
  static mixTitle(swal, title) {
    return this.mixTitleDesc(swal, title);
  }
}
