import { SubscriptionApi } from "@/api";
import { ErrorHelper } from "@/helpers";

/**
 * 訂閱資料相關邏輯
 */
export class SubscriptionService {
  /**
   * 取得所有訂閱資訊。
   * 對應於 {@link SubscriptionApi.fetchSubscriptions} 的處理。
   * @returns {Promise<Object[]>} 由後端取回的資料，預設空陣列。
   */
  static async fetchSubscriptions() {
    let result;
    await SubscriptionApi.fetchSubscriptions()
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(`[fetchSubscriptions] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      });
    return result || [];
  }

  /**
   * 訂閱。
   * @param {{ email: string }} data 資料。
   * @returns {Promise<Object>} 新增成功後回傳的資料。
   * @throws 拋出處理異常。
   */
  static async subscribe(data) {
    /** 檢查資料，有誤則回傳 undefined */
    if (!data?.email) {
      throw Error("Email 必須有值！");
    }

    let res = null;

    /** 先以 email 查詢訂閱資料，若已存在則直接回傳資料（避免重複存入相同的 email） */
    try {
      res = await SubscriptionApi.fetchSubscriptionByEmail(data.email);
      
      // 資料已存在
      if (res.data.length > 0) {
        return res.data[0];
      }
    } catch (error) {
      console.error(`[subscribe] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      throw error;
    }

    /** 若沒有資料則新增之 */
    try {
      res = await SubscriptionApi.postSubscription(data);
      return res.data;
    } catch (error) {
      console.error(`[subscribe] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      throw error;
    }
  }
}
