<template>
  <div class="d-flex flex-wrap gap-5">
    <button type="button" class="btn btn-primary py-3 px-5" @click="testNotError">非錯誤</button>

    <button type="button" class="btn btn-primary py-3 px-5" @click="testThrowError">
      拋出自訂錯誤
    </button>

    <button type="button" class="btn btn-primary py-3 px-5" @click="testAxiosUrlError">
      Axios 網址錯誤
    </button>

    <button type="button" class="btn btn-primary py-3 px-5" @click="testAxiosDataNotFound">
      Axios 查無資料
    </button>

    <button type="button" class="btn btn-primary py-3 px-5" @click="testAxiosLoginError">
      Axios 登入失敗
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { SysConstants } from "../../helpers/sysConstants";
import { ErrorHelper } from "@/helpers";
import { UserApi } from "@/api";

export default {
  data() {
    return {};
  },

  methods: {
    /** 非錯誤 */
    testNotError() {
      const error = "我不是錯誤";
      console.log(`isAxiosError ==>`, ErrorHelper.isAxiosError(error));
      console.log(`isJsError ==>`, ErrorHelper.isJsError(error));
      console.log(`=============`);
      console.log(`getAxiosError ==> ${ErrorHelper.formatAxiosError(error)}`);
      console.log(`getErrorMsg ==> ${ErrorHelper.getErrorMsg(error)}`);
    },

    /** 拋出自訂錯誤 */
    testThrowError() {
      const test = true;

      try {
        if (test) {
          // throw Error("這是自訂 Error！");
          throw TypeError("這是自訂 TypeError！");
        }
      } catch (error) {
        console.error(`[testThrowError] ==>`, error);
        console.dir(error);
        console.log(`=============`);
        console.log(`isAxiosError ==>`, ErrorHelper.isAxiosError(error));
        console.log(`isJsError ==>`, ErrorHelper.isJsError(error));
        console.log(`=============`);
        console.log(`getAxiosError ==> ${ErrorHelper.formatAxiosError(error)}`);
        console.log(`getErrorMsg ==> ${ErrorHelper.getErrorMsg(error)}`);
      }
    },

    /** Axios 網址錯誤 */
    testAxiosUrlError() {
      axios
        .get(`${SysConstants.apiBaseUrl}aaa`)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(`[testAxiosUrlError] ==>`, error);
          console.dir(error);
          console.log(`=============`);
          console.log(`isAxiosError ==>`, ErrorHelper.isAxiosError(error));
          // Axios 的錯誤繼承 JS Erro，因此同時亦為 JS Error
          console.log(`isJsError ==>`, ErrorHelper.isJsError(error));
          console.log(`=============`);
          console.log(`getAxiosError ==>`, ErrorHelper.formatAxiosError(error));
          console.log(`getErrorMsg ==> ${ErrorHelper.getErrorMsg(error)}`);
        });
    },

    /** Axios 查無資料 */
    testAxiosDataNotFound() {
      UserApi.fetchById(99)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(`[testAxiosUrlError] ==>`, error);
          console.dir(error);
          console.log(`=============`);
          console.log(`isAxiosError ==>`, ErrorHelper.isAxiosError(error));
          // Axios 的錯誤繼承 JS Erro，因此同時亦為 JS Error
          console.log(`isJsError ==>`, ErrorHelper.isJsError(error));
          console.log(`=============`);
          console.log(`getAxiosError ==>`, ErrorHelper.formatAxiosError(error));
          console.log(`getErrorMsg ==> ${ErrorHelper.getErrorMsg(error)}`);
        });
    },

    /** Axios 登入失敗 */
    testAxiosLoginError() {
      const data = {
        email: "test99@7tao.com",
        password: "a12345678",
      };

      axios
        .post(`${SysConstants.apiBaseUrl}login`, data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(`[testAxiosUrlError] ==>`, error);
          console.dir(error);
          console.log(`=============`);
          console.log(`isAxiosError ==>`, ErrorHelper.isAxiosError(error));
          // Axios 的錯誤繼承 JS Erro，因此同時亦為 JS Error
          console.log(`isJsError ==>`, ErrorHelper.isJsError(error));
          console.log(`=============`);
          console.log(`getAxiosError ==>`, ErrorHelper.formatAxiosError(error));
          console.log(`getErrorMsg ==> ${ErrorHelper.getErrorMsg(error)}`);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
