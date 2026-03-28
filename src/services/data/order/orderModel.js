import { Model } from "../model";
import { OrderRecord } from "./orderRecord";

/**
 * 訂單資料模型
 */
export class OrderModel extends Model {
  /**
   * 訂單資料集。
   * @type {OrderRecord[]}
   */
  get datas() {
    return this._datas;
  }

  /**
   * 訂單資料模型。
   * @param {Object[]} [datas] 訂單資料集。
   */
  constructor(datas = []) {
    super();

    datas.forEach((item) => {
      // 轉換資料
      const orderRecord = new OrderRecord(item);
      // 建置資料集
      this._datas.push(orderRecord);
    });
  }
}
