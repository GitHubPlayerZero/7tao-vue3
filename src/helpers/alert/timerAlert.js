import Swal from "sweetalert2";
import { AlertParam } from "./alertParam";
import { AlertComSetting } from "./alertComSetting";
import { AlertModel } from "./alertModel";
import { CheckHelper } from "../checkHelper";
import { TypeUtils } from "../typeUtils";

/**
 * 倒數計時執行回呼函式的訊息窗（{@link TimerAlert.alertCountdownCallback}）的執行參數，建構時可給入倒數計時的秒數，否則會使用預設值。
 * 1. [timer] 屬性不開放自行設定（即使設定了也會被覆蓋）。會依據建構時給入的 [seconds] 換算成毫秒。
 * 2. [html] 屬性不開放自行設定（即使設定了也會被覆蓋）。會固定顯示倒數計時內容，可使用 [desc] 屬性作為額外的說明，會以另一個段落顯示於倒數計時的下方。
 * 3. [icon] 預設為成功圖示，可再自行覆蓋設定。
 * 4. [timerProgressBar] 預設為顯示，可再自行覆蓋設定。
 * @param {number} [seconds] 倒數計時的秒數，只接受大於 0 的整數，預設值 10 秒。
 * @throws {RangeError} 當 second 不是大於 0 的整數時會拋出錯誤。
 */
export class CountdownCallbackTimerParam extends AlertParam {
  /**
   * 倒數計時秒數，建構時即依據給入的值或預設值設定。
   * @type {number}
   */
  #seconds;

  // 說明，以 setter、getter 作為對外窗口，以避免被當成 SweetAlert2 參數而出現警告
  #desc = "";

  /**
   * 說明，會被作為 html 說明的一部份，顯示於倒數計時下方。
   * @type {string}
   */
  set desc(str) {
    this.#desc = str;
  }
  get desc() {
    return this.#desc;
  }

  // Callback function，以 setter、getter 作為對外窗口，以利於設定時檢查類型
  #callback = () => {};

  /**
   * Callback function，預設為不執行任何動作的方法。
   * @param {Function} fun Callback function。
   * @throws {TypeError} 當 callback 不為 Function 時會拋出錯誤。
   */
  set callback(fun) {
    // 檢查 callback 的合法性
    if (!TypeUtils.isFunction(fun)) {
      throw TypeError("[callback] 必須為 Function！");
    }
    this.#callback = fun;
  }

  get callback() {
    return this.#callback;
  }

  /** 建構 */
  constructor(seconds = 10) {
    // 檢查秒數的合法性
    if (!CheckHelper.intGreaterThanZeroPattern.test(seconds)) {
      throw RangeError("[second] 必須為大於 0 的整數！");
    }

    super();

    this.#seconds = seconds;

    // 視窗的 icon，預設為「成功」狀態
    this.icon = AlertParam.ICON_OPTIONS.SUCCESS;

    // 預設顯示 timerProgressBar
    this.timerProgressBar = true;
  }

  getParamSet() {
    // 秒數換算成 timer 時間（毫秒）
    this.timer = this.#seconds * 1000;

    // 格式化 html 內容：
    // 1) 預設放入倒數計時資訊
    this.html = `<p>倒數 <span id="countdown">${this.#seconds}</span> 秒...</p>`;

    // 2) 若有給入額外的說明，則接續新段落顯示
    if (this.desc) {
      this.html += `<p>${this.desc}</p>`;
    }

    return super.getParamSet();
  }
}

/**
 * Timer 類型的訊息窗。
 */
export class TimerAlert extends AlertModel {
  /** Timer 基礎訊息窗。 */
  static get timerBaseModel() {
    return this.baseModel.mixin(AlertComSetting.timer.getParamSet());
  }

  /** Timer 成功訊息窗。 */
  static get timerSuccessModel() {
    return this.timerBaseModel.mixin(AlertComSetting.success.getParamSet());
  }

  /**
   * 顯示成功訊息，時間到會自動關閉訊息窗。
   * @param {string} [msg = ""] 成功訊息，應簡短扼要。
   */
  static async alertSuccess(msg = "") {
    await this.mixTitle(this.timerSuccessModel, msg).fire();
  }

  /**
   * 顯示倒數計時訊息，時間到會自動執行回呼函式。
   * @param {CountdownCallbackTimerParam} param 訊息窗參數，接收 CountdownCallbackParam。
   */
  static async alertCountdownCallback(param) {
    let timerInterval;

    await this.timerBaseModel
      .fire({
        ...AlertComSetting.lock.getParamSet(),
        ...param.getParamSet(),

        didOpen(popup) {
          // 倒數計時
          const elemCountdown = popup.querySelector("#countdown");
          timerInterval = setInterval(() => {
            elemCountdown.textContent = `${Math.ceil(Swal.getTimerLeft() / 1000)}`;
          }, 1000);
        },

        // eslint-disable-next-line no-unused-vars
        willClose(popup) {
          clearInterval(timerInterval);
        },
      })
      .then(async (result) => {
        if (!result.isDenied) {
          // 執行 callback function
          param.callback();
        }
      });
  }
}
