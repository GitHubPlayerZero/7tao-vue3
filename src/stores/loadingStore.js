import { defineStore } from "pinia";
import { useLoading } from "vue-loading-overlay";
import { LoadingSettings, KeyboardDisableHelper } from "@/helpers";

/**
 * 全域 loading 狀態管理。
 */
export const useLoadingStore = defineStore("loadingStore", () => {
  /**
   * vue-loading-overlay 物件。
   * @type {import('vue-loading-overlay').PluginApi}
   */
  const vueLoading = useLoading(LoadingSettings.baseSettings);

  /**
   * vue-loading-overlay 開啟的 loader 物件。
   * @type {import('vue-loading-overlay').ActiveLoader|null}
   */
  let loader = null;

  /** 共同使用此 loading 的程式數量，用來作為控制 loading 開關的依據。 */
  let loadingCnt = 0;

  /** 是否已開啟 loading？用來作為控制 loading 開關的依據。 */
  let isOpened = false;

  /**
   * app 區域的禁用鍵盤的工具。
   * @type {KeyboardDisableHelper}
   */
  const appKeyboard = new KeyboardDisableHelper(document.querySelector("#app"));

  /**
   * 檢查 loading 並控制其開關。
   */
  function checkLoading() {
    // 開啟
    if (!isOpened && loadingCnt === 1) {
      // loading 期間屏蔽鍵盤動作
      appKeyboard.disable();

      loader = vueLoading.show();

      // 使 loading 取得焦點，並且禁止鍵盤操作 (主要防止 tab)
      const elemOverlay = document.querySelector(".vl-overlay.vl-full-page");
      elemOverlay.focus();
      new KeyboardDisableHelper(elemOverlay).disable();

      isOpened = true;
    }
    // 關閉
    else if (isOpened && loadingCnt <= 0) {
      reset();
    }
  }

  /**
   * 開啟 loading。
   */
  function open() {
    loadingCnt++;
    checkLoading();
  }

  /**
   * 關閉 loading。
   */
  function close() {
    loadingCnt--;
    checkLoading();
  }

  /**
   * 重新初始化設定以便重新開始使用。
   */
  function reset() {
    appKeyboard.enable(); // 取消鍵盤屏蔽

    if (loader) {
      loader.hide();
    }

    loader = null;
    loadingCnt = 0;
    isOpened = false;
  }

  return { open, close, reset };
});
