import { Model } from "../model";
import { UserRecord } from "./userRecord";

/**
 * 使用者資料模型
 */
export class UserModel extends Model {
  /**
   * 使用者資料集。
   * @type {UserRecord[]}
   */
  get datas() {
    return this._datas;
  }

  /**
   * 使用者資料模型。
   * @param {UserData[]} [users] 使用者資料集。
   */
  constructor(users = []) {
    super();

    users.forEach((item) => {
      // 轉換資料
      const userRecord = new UserRecord(item);
      // 建置資料集
      this._datas.push(userRecord);
    });
  }
}
