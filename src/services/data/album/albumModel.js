import { Model } from "../model";
import { AlbumRecord } from "./albumRecord";
import { TagModel } from "../tag";

/**
 * 相簿資料模型
 * @extends {Model}
 */
export class AlbumModel extends Model {
  /**
   * 相簿資料集。
   * @type {AlbumRecord[]}
   */
  get datas() {
    return this._datas;
  }

  /**
   * 相簿資料模型。
   * @param {object[]} [albums] Album 資料集。
   * @param {TagModel} tagModel Tag 資料模型。
   */
  constructor(albums = [], tagModel) {
    // 檢查 albums 是否為陣列
    if (!Array.isArray(albums)) {
      throw new TypeError("[albums] 必須是陣列！");
    }

    // 檢查 tagModel 是否為有效的 TagModel 實例
    if (!TagModel.isMe(tagModel)) {
      throw new TypeError("[tagModel] 必須是有效的 TagModel 實例！");
    }

    super();

    albums.forEach((item) => {
      // 轉換資料
      const albumRecord = new AlbumRecord(item, tagModel);
      // 建置資料集
      this._datas.push(albumRecord);
    });
  }
}
