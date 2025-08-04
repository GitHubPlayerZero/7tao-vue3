/**
 * 換行處理工具。
 */
export class LineBreakUtils {
  /**
   * 換行符號。
   * @type {string}
   */
  static #lineBreakSymbol = "\n";

  /**
   * 將文章依據換行符號切割成段落。
   * @param {string} article 文章。
   * @returns {string[]} 切割好的各段落，若無法切割則回傳空陣列。
   */
  static splitParagraphs(article) {
    return article?.split(this.#lineBreakSymbol) ?? [];
  }
}
