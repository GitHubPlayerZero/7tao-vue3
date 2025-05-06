import { EventBase } from "./eventBase";

/** 禁用鍵盤的相關處理。 */
export class KeyboardDisableHelper extends EventBase {
  /** 是否已禁用鍵盤？ */
  #isDisabled = false;

  /** 是否已禁用鍵盤？ */
  get isDisabled() {
    return this.#isDisabled;
  }

  /**
   * 鍵盤禁用效果中止控制器。
   * @type {AbortController}
   */
  #disabledAbortController;

  /**
   * 禁用鍵盤的相關處理。
   * @param {HTMLElement} elem 需要被監聽的元素，必填。
   * @throws 檢查 elem，若不正確會拋出錯誤。
   */
  constructor(elem) {
    super(elem);
  }

  /**
   * 禁用鍵盤，可使用 {@link enable} 中止禁用效果。
   */
  disable() {
    // 若已禁用鍵盤則不重複執行，以避免無法中止
    if (this.isDisabled) {
      return;
    }

    // 於捕獲階段觸發
    const options = { capture: true };

    // 允許中止
    this.#disabledAbortController = new AbortController();
    options.signal = this.#disabledAbortController.signal;

    // 只需屏蔽 keydown、keyup，因為只要屏蔽了 keydown 就不會觸發 keypress
    ["keydown", "keyup"].forEach((item) => {
      this._elem.addEventListener(
        item,
        (event) => {
          event.preventDefault();
          event.stopPropagation();
        },
        options
      );
    });

    this.#isDisabled = true;
  }

  /**
   * 中止鍵盤禁用效果。
   */
  enable() {
    if (this.#disabledAbortController) {
      this.#disabledAbortController.abort();
      this.#disabledAbortController = undefined;
      this.#isDisabled = false;
    }
  }
}
