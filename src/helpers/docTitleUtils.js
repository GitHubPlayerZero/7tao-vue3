/** 網頁主標題。 */
const mainTitle = import.meta.env.VITE_DOC_TITLE || `7TAO`;

/** 標題分隔符號。 */
const separator = "｜";

/** 網頁主標題作為子標題。 */
const subMainTitle = `${separator}${mainTitle}`;

export class DocTitleUtils {
  /**
   * 網頁主標題。
   * @type {string}
   */
  static get mainTitle() {
    return mainTitle;
  }

  /**
   * 網頁主標題作為子標題。
   * @type {string}
   */
  static get subMainTitle() {
    return subMainTitle;
  }

  /**
   * 串接主標題。
   * @param {...string} subTitles 子標題，可以給入多個。
   * @returns {string} 將所有子標題按順序串接在一起，最後會再串上主標題。
   */
  static concatMainTitle(...subTitles) {
    return subTitles.join(separator) + subMainTitle;
  }
}
