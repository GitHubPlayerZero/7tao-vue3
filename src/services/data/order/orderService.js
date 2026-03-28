import { customAlphabet } from "nanoid";
import { DataUtils, ErrorHelper } from "@/helpers";
import { OrderApi } from "@/api";
// eslint-disable-next-line no-unused-vars
import { OrderRecord } from "./orderRecord";

/**
 * 訂單資料相關邏輯
 */
export class OrderService {
  /**
   * 建立訂單（本人）。
   * @async
   * @param {OrderRecord} orderRecord 訂單資料。
   * @returns {Promise<Object>} 訂單建立結果。
   * @throws {Error} 若未提供訂單資料 或 API 請求失敗時拋出錯誤。
   */
  static async postSelfOrder(orderRecord) {
    if (!orderRecord) throw TypeError("必須提供訂單資料！");

    // 訂單編號
    orderRecord.orderNo = customAlphabet("1234567890", 9)();

    // 取票序號
    orderRecord.collectionNo = customAlphabet("1234567890ABDFGHJKNOPSTUWXYZ", 10)();

    // 票券編號
    orderRecord.ticketNo = customAlphabet("1234567890", 8)();

    // 訂購時間
    const timestamp = Date.now();
    orderRecord.createdDate = timestamp;
    orderRecord.updatedDate = timestamp;

    const orderData = DataUtils.classToJson(orderRecord);

    try {
      const response = await OrderApi.postSelfOrder(orderData);
      return response.data;
    } catch (error) {
      console.error(`[postSelfOrder] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      throw error;
    }
  }
}
