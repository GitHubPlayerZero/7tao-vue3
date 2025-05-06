import { TypeUtils } from "../typeUtils";

/**
 * 事件工具共用基礎。
 */
export class EventBase {
  /**
   * 被監聽的元素。
   * @type {HTMLElement}
   * @protected
   */
  _elem;

  /**
   * 事件工具共用基礎。
   * @param {HTMLElement} elem 需要被監聽的元素，必填。
   * @throws 檢查 elem，若不正確會拋出錯誤。
   */
  constructor(elem) {
    if (!TypeUtils.isHtmlElement(elem)) {
      throw Error("[elem] 必須傳入 HTML 元素！");
    }
    this._elem = elem;
  }
}
