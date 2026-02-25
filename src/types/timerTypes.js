/**
 * 定義 useTimer 回傳內容。
 * @typedef {Object} Timer
 * @property {import('vue').Ref<number>} countdown 剩餘秒數。
 * @property {() => void} start 啟動計時器，每秒遞減。
 * @property {() => void} clear 清除計時器。
 */
