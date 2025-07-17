/**
 * loading 設定。
 */
export class LoadingSettings {
  /**
   * 基本設定選項。
   * @typedef {Object} LoadingBaseSettings
   * @property {string} color loading 圖示顏色（CSS 顏色值），預設為 "blue"。
   * @property {string} loader loading 樣式（如 'dots'、'bars'、'spinner' 等），預設為 "dots"。
   * @property {number} zIndex loading 遮罩的 z-index 層級，預設為 1059 以避免遮蔽 SWAL2。
   * @property {boolean} enforceFocus 是否強制 focus loading，預設為 false 以避免使 SWAL2 失焦。
   * @returns {LoadingBaseSettings} loading 基本設定物件。
   */
  static get baseSettings() {
    return {
      // color: "var(--bs-primary)",
      color: "blue",
      loader: "dots",
      zIndex: 1059, // 避免遮蔽 SWAL2 (SWAL2 的 z-index 為 1060)
      enforceFocus: false, // 避免使 SWAL2 失焦
    };
  }
}
