import { TypeUtils } from "@/helpers";
import { Record } from "../record";
import { TagModel } from "../tag";
import { EventService } from "../event";

/**
 * 單筆 Album 資料
 * @extends {Record}
 */
export class AlbumRecord extends Record {
  static #props = ["tags", "title"];

  /**
   * 所有標籤 ID。
   * @type {number[]}
   */
  tags = [];

  /**
   * 標籤名稱。
   * @type {string}
   */
  label = "";

  /**
   * 標題。
   * @type {string}
   */
  title = "";

  /**
   * 封面相片。
   * @type {string}
   */
  coverPhoto = "";

  /**
   * 相片們。
   * @type {string[]}
   */
  photos = [];

  /**
   * 單筆 Album 資料。
   * @param {object} data Album 資料物件。
   * @param {TagModel} tagModel Tag 資料模型。
   */
  constructor(data, tagModel) {
    // 檢查 data 是否為有效物件
    if (!TypeUtils.isExactObject(data)) {
      throw new TypeError("[data] 必須是有效的物件！");
    }

    // 檢查 tagModel 是否為有效的 TagModel 實例
    if (!TagModel.isMe(tagModel)) {
      throw new TypeError("[tagModel] 必須是有效的 TagModel 實例！");
    }

    super(data);
    this._assignData(data, AlbumRecord.#props);

    // 設定標籤名稱：為主要 tag 的名稱
    this.label = tagModel.getNameById(this.tags[EventService.mainTagIndex]);

    // 設定相片們
    this.photos = data.albumPhotos || [];

    // 設定封面相片
    this.coverPhoto = this.photos[0] || "";
  }
}
