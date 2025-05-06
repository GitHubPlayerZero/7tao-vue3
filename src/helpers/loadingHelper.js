import { useLoading } from "vue-loading-overlay";
import { KeyboardDisableHelper } from "./event/keyboardHelper";

/** loading 基本建置。 */
class LoadingBase {
  /**
   * 基本設定選項。
   */
  static get #baseSettings() {
    return {
      // color: "var(--bs-primary)",
      color: "blue",
      loader: "dots",
      zIndex: 1059, // 避免遮蔽 SWAL2 (SWAL2 的 z-index 為 1060)
      enforceFocus: false, // 避免使 SWAL2 失焦
    };
  }

  /**
   * vue-loading-overlay 物件。
   * @type {import('vue-loading-overlay').PluginApi}
   * @protected
   */
  _$loading;

  /**
   * vue-loading-overlay 物件基本建置，會使用預設的基本設定選項。
   * 允許傳入另外的設定選項，可以覆蓋基本設定中重複的項目。
   * @param {LoadingOptions} [options = {}] 設定選項（vue-loading-overlay 的選項），可選。
   */
  constructor(options = {}) {
    this._$loading = useLoading({
      ...LoadingBase.#baseSettings,
      ...options,
    });
  }
}
// LoadingBase end

/** 全屏 loading。 */
export class FullLoadingHelper extends LoadingBase {
  /**
   * app 區域的禁用鍵盤的工具。
   * @type {KeyboardDisableHelper}
   */
  #appKeyboard = new KeyboardDisableHelper(document.querySelector("#app"));

  /**
   * vue-loading-overlay 開啟的 loader 物件。
   * @type {import('vue-loading-overlay').ActiveLoader}
   */
  #loader;

  /** 共同使用此 loading 的程式數量，用來作為控制 loading 開關的依據。 */
  #loadingCnt = 0;

  /** 是否已開啟 loading？用來作為控制 loading 開關的依據。 */
  #isOpened = false;

  /**
   * 以 vue-loading-overlay 為基礎，開啟全屏 loading。
   * 允許傳入另外的設定選項，可以覆蓋基本設定重複的項目。
   * @param {LoadingOptions} [options = {}] 設定選項（vue-loading-overlay 的選項），可選。
   */
  constructor(options = {}) {
    // 建立 loading 物件，會強制 container 為 undefined 以確保開啟全屏的 loading
    super({ ...options, container: undefined });
  }

  /**
   * 檢查 loading 並控制其開關。
   */
  #checkLoading() {
    // TODO delete console.log
    console.log(`[FullLoading checkLoading]...............`, this.#isOpened, this.#loadingCnt);

    // 開啟
    if (!this.#isOpened && this.#loadingCnt === 1) {
      console.log(`[FullLoading checkLoading] open!`);

      // loading 期間屏蔽鍵盤動作
      this.#appKeyboard.disable();

      this.#loader = this._$loading.show();

      // 使 loading 取得焦點，並且禁止鍵盤操作 (主要防止 tab)
      const elemOverlay = document.querySelector(".vl-overlay.vl-full-page");
      elemOverlay.focus();
      new KeyboardDisableHelper(elemOverlay).disable();

      this.#isOpened = true;
    }
    // 關閉
    else if (this.#isOpened && this.#loadingCnt <= 0) {
      console.log(`[FullLoading checkLoading] close!`);
      this.#appKeyboard.enable(); // 取消鍵盤屏蔽
      this.#loader.hide();
      this.#isOpened = false;
    }
  }

  /**
   * 開啟 loading。
   */
  open() {
    this.#loadingCnt++;
    this.#checkLoading();
  }

  /**
   * 關閉 loading。
   */
  close() {
    this.#loadingCnt--;
    this.#checkLoading();
  }
}
