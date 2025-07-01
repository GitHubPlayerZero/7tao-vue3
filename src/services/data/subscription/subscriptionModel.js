import { Model } from "../model";
import { SubscriptionRecord } from "./subscriptionRecord";

/**
 * 訂閱資料模型
 */
export class SubscriptionModel extends Model {
  /**
   * 訂閱資料集。
   * @type {SubscriptionRecord[]}
   */
  get datas() {
    return this._datas;
  }

  /**
   * 訂閱資料模型。
   * @param {Object[]} [subscriptions] Subscription 資料集。
   */
  constructor(subscriptions = []) {
    super();

    subscriptions.forEach((item) => {
      // 轉換資料
      const subscriptionRecord = new SubscriptionRecord(item);
      // 建置資料集
      this._datas.push(subscriptionRecord);
    });
  }
}
