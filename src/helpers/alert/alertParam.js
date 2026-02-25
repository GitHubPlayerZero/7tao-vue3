import { TypeUtils } from "../typeUtils";

/**
 * 參數設定共用底層，用來進行共通的處理。
 */
class ParamProcessor {
  constructor() {}

  /**
   * 取得所有有效參數設定的集合，會自動略過 undefined 的參數（即沒有 預設值 也沒有 事後給予值 的參數）。
   * @returns {Object} 所有有效參數組成的 JSON 物件，會略過為 undefined 的參數，但會包含值為 null 的參數。
   */
  getParamSet() {
    return JSON.parse(JSON.stringify(this));
  }
}

/**
 * SweetAlert2 customClass 各項參數設定。
 */
export class AlertCustomClass extends ParamProcessor {
  container;
  popup;
  header;
  title;
  closeButton;
  icon;
  image;
  htmlContainer;
  input;
  inputLabel;
  validationMessage;
  actions;
  confirmButton;
  denyButton;
  cancelButton;
  loader;
  footer;
  timerProgressBar;

  constructor() {
    super();
  }
}

/**
 * SweetAlert2 各項參數設定。
 */
export class AlertParam extends ParamProcessor {
  /** position 參數的選項。 */
  static POSITION_OPTIONS = {
    TOP: "top",
    TOP_START: "top-start",
    TOP_END: "top-end",
    CENTER: "center",
    CENTER_START: "center-start",
    CENTER_END: "center-end",
    BOTTOM: "bottom",
    BOTTOM_START: "bottom-start",
    BOTTOM_END: "bottom-end",
  };

  /** icon 參數的選項。 */
  static ICON_OPTIONS = {
    WARNING: "warning",
    ERROR: "error",
    SUCCESS: "success",
    INFO: "info",
    QUESTION: "question",
  };

  /**
   * 視窗位置。
   * SweetAlert2 預設為置中（center）。
   * @type {undefined|string}
   */
  position;

  /**
   * 是否顯示 Confirm button？
   * SweetAlert2 預設顯示。
   * @type {undefined|boolean}
   */
  showConfirmButton;

  /**
   * Confirm button 所顯示的文字。
   * SweetAlert2 預設顯示 "OK"。
   * @type {undefined|string}
   */
  confirmButtonText;

  /**
   * Confirm button 的顏色。
   * SweetAlert2 預設是 #3085d6。
   * @type {undefined|string}
   */
  confirmButtonColor;

  /**
   * 是否聚焦於 Confirm button？
   * SweetAlert2 預設 true。
   * @type {boolean}
   */
  focusConfirm;

  /**
   * 是否顯示 Deny button？
   * SweetAlert2 預設不顯示。
   * @type {undefined|boolean}
   */
  showDenyButton;

  /**
   * Deny button 所顯示的文字。
   * SweetAlert2 預設顯示 "No"。
   * @type {undefined|string}
   */
  denyButtonText;

  /**
   * Deny button 的顏色。
   * SweetAlert2 預設是 #dd6b55。
   * @type {undefined|string}
   */
  denyButtonColor;

  /**
   * 是否聚焦於 Deny button？
   * SweetAlert2 預設 false。
   * @type {boolean}
   */
  focusDeny;

  /**
   * 是否顯示 Cancel button？
   * SweetAlert2 預設不顯示。
   * @type {undefined|boolean}
   */
  showCancelButton;

  /**
   * Cancel button 所顯示的文字。
   * SweetAlert2 預設顯示 "Cancel"。
   * @type {undefined|string}
   */
  cancelButtonText;

  /**
   * Cancel button 的顏色。
   * SweetAlert2 預設是 #aaa。
   * @type {undefined|string}
   */
  cancelButtonColor;

  /**
   * 是否聚焦於 Cancel button？
   * SweetAlert2 預設 false。
   * @type {boolean}
   */
  focusCancel;

  /**
   * 彈出視窗的 icon。
   * @type {undefined|string}
   */
  icon;

  /**
   * 彈出視窗的標題，以 HTML 形式呈現。
   * 為了避免 HTML 注入攻擊，建議儘量使用 titleText。
   * SweetAlert2 預設為空字串。
   * @type {undefined|string}
   */
  title;

  /**
   * 彈出視窗的標題，以文字形式呈現，有助於避免 HTML 注入。
   * SweetAlert2 預設為空字串。
   * @type {undefined|string}
   */
  titleText;

  /**
   * 彈出視窗的 HTML 說明，優先級高於 text 參數，開發者需要自行防止 XSS 攻擊。
   * SweetAlert2 預設為空字串。
   * @type {undefined|string}
   */
  html;

  /**
   * 彈出視窗的純文字說明，若同時也有提供 html 參數，則會使用 html。
   * SweetAlert2 預設為空字串。
   * @type {undefined|string}
   */
  text;

  /**
   * 是否允許透過點擊視窗外關閉彈出視窗？
   * SweetAlert2 預設為允許。
   * @type {undefined|boolean}
   */
  allowOutsideClick;

  /**
   * 是否允許透過按 Esc 鍵關閉彈出視窗？
   * SweetAlert2 預設為允許。
   * @type {undefined|boolean}
   */
  allowEscapeKey;

  /**
   * 彈出視窗自動關閉計時器，以毫秒（ms）為單位。
   * @type {undefined|number}
   */
  timer;

  /**
   * 是否在彈出視窗底部顯示計時器進度條？
   * SweetAlert2 預設不顯示。
   * @type {undefined|boolean}
   */
  timerProgressBar;

  // 自訂各部份使用的 CSS class，以 setter、getter 作為對外窗口。
  #customClass;

  /**
   * 自訂各部份使用的 CSS class，使用 CustomClass。
   * @param {AlertCustomClass} val CustomClass。
   */
  set customClass(val) {
    this.#customClass = val;
  }
  get customClass() {
    return this.#customClass;
  }

  constructor() {
    super();
  }

  getParamSet() {
    const setting = super.getParamSet();

    // 當 #customClass 有值，並且型別為 CustomClass，則進行 customClass 參數的處理。
    // 註：私有屬性、getter、setter 不會被轉出。
    if (this.#customClass && this.#customClass instanceof AlertCustomClass) {
      // 取得參數設定
      const customClass = this.#customClass.getParamSet();

      // 有內容則加入
      if (!TypeUtils.isEmptyObject(customClass)) {
        setting.customClass = customClass;
      }
    }

    return setting;
  }
}
