import { TypeUtils, LoadingSettings, KeyboardDisableHelper } from "@/helpers";
import { useLoading } from "vue-loading-overlay";

/**
 * 以 vue-loading-overlay 為基礎，開啟區域性 loading。
 * 允許傳入另外的設定選項，可以覆蓋基本設定重複的項目。
 * @param {HTMLElement} element 開啟區域 loading 的 DOM 元素，必要參數。
 * @param {LoadingOptions} [options = {}] 設定選項（vue-loading-overlay 的選項），可選。
 * @returns {AreaLoadingReturns} 用於控制 loading 狀態的相關方法。
 * @throws {TypeError} 如果 element 不是 DOM 元素則拋出型別錯誤。
 */
export function useAreaLoading(element, options = {}) {
  // 基本檢核，不通過則拋出異常
  if (!TypeUtils.isHtmlElement(element)) {
    throw TypeError("[element] 必須為 DOM 元素！");
  }

  /**
   * vue-loading-overlay 物件。
   * @type {import('vue-loading-overlay').PluginApi}
   */
  let vueLoading = null;
  /**
   * vue-loading-overlay 開啟的 loader 物件。
   * @type {import('vue-loading-overlay').ActiveLoader|null}
   */
  let loader = null;

  /**
   * container 元素。
   * @type {HTMLElement|null}
   */
  let containerElmt = null;

  /**
   * container 元素的 tabindex。
   * loading 期間會設為 0 以優先被 tab 選取，進而保護內容不會被選取（搭配禁用鍵盤），loading 結束後會還原設定。
   * @type {number|null}
   */
  let containerTabindex = null;

  /**
   * container 區域的禁用鍵盤的工具。
   * @type {KeyboardDisableHelper|null}
   */
  let containerKeyboard = null;

  // 建立 loading 物件，會強制 container 為傳入的元素，以確保開啟區域性的 loading
  vueLoading = useLoading({
    ...LoadingSettings.baseSettings,
    ...options,
    container: element,
  });

  // 初始化設定
  containerElmt = element;
  containerTabindex = element.getAttribute("tabindex");
  containerKeyboard = new KeyboardDisableHelper(element);

  /**
   * 開啟 loading。
   */
  function open() {
    // 避免重複開啟
    if (loader) {
      return;
    }

    // 阻止 container 區域的內容被選取
    containerElmt.setAttribute("tabindex", "0");
    containerElmt.focus();
    containerKeyboard.disable();

    // 開啟 loading
    loader = vueLoading.show();
  }

  /**
   * 關閉 loading。
   */
  function close() {
    if (!loader) {
      return;
    }

    // 取消 container 區域的保護
    containerElmt.setAttribute("tabindex", containerTabindex);
    containerKeyboard.enable();

    // 關閉 loading
    loader.hide();
    loader = null;
  }

  return {
    open,
    close,
  };
}
