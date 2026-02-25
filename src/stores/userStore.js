import { ref } from "vue";
import { defineStore } from "pinia";
import { AuthService } from "@/services";
import { UserService } from "@/services/data/user";

/**
 * 使用者資料狀態管理。
 */
export const useUserStore = defineStore(
  "userStore",
  () => {
    let id = ref(null); // id
    let name = ref(""); // 姓名

    /**
     * 使用者資料集合物件。
     * @type {UserData|null}
     */
    let userData = null;

    /**
     * 設定完整的使用者資料（密碼除外）。
     * @param {UserData} data 使用者資料。
     */
    function set(data) {
      id.value = data.id;
      name.value = data.name;

      userData = {
        id: data.id, // id
        name: data.name, // 姓名
        email: data.email, // Email
        mobilePhone: data.mobilePhone, // 手機
        rocId: data.rocId, // 身份證字號
        gender: data.gender, // 性別
      };
    }

    /**
     * 取得使用者資料。
     * 若使用者資料集合物件有值則直接使用，否則重新取得資料。
     * @returns {Promise<UserData>} 以 Promise 包裹的使用者資料物件。
     * @throws {Error} 若執行過程中發生失敗則會拋出錯誤。
     */
    async function get() {
      // 目前無資料，由 API 重新取得會員資料
      if (!userData) {
        const data = await UserService.fetchSelf(AuthService.getToken(), id.value);
        set(data); // 設定使用者資料狀態
      }

      return userData;
    }

    /**
     * 修改使用者資料。
     * @param {EditableUserData} data 可修改的使用者資料內容。
     * @returns {Promise<UserData>} 以 Promise 包裹的更新後的使用者資料物件。
     * @throws {Error} 若執行過程中發生失敗則會拋出錯誤。
     */
    async function modify(data) {
      const updatedData = await UserService.modifySelf(AuthService.getToken(), id.value, data);
      set(updatedData); // 更新使用者資料狀態
      return updatedData;
    }

    /**
     * 清除使用者資料。
     */
    function clear() {
      id.value = null;
      name.value = "";
      userData = null;

      // 清除 persisted state 的 localStorage 資料
      // 必須要使用非同步的方式，否則 localStorage 會被咬住而無法刪除
      setTimeout(() => {
        localStorage.removeItem("userStore");
      }, 0);
    }

    /**
     * 取得使用者資料集合字串。
     * @returns {string} 使用者資料字串。
     */
    function toString() {
      return JSON.stringify(userData);
    }

    return { id, name, set, get, modify, clear, toString };
  },
  {
    // 持久化設定
    persist: {
      pick: ["id", "name"], // 僅對有設定的欄位進行持久化
    },
  }
);
