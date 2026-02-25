<template>
  <section>
    <h3 class="text-danger">刪除帳號</h3>
    <p>注意！一旦刪除帳號，資料就無法復原，請小心！</p>
    <button
      type="button"
      class="btn btn-danger py-4 py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 d-flex justify-content-center align-items-center w-100 mb-3"
      @click="showConfirm"
    >
      刪除帳號
    </button>
  </section>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useLoadingStore, useUserStore } from "@/stores";
import { ErrorHelper, ConfirmAlert, AlertModel, AlertParam } from "@/helpers";
import { AuthService, Redirector } from "@/services";
import { UserService } from "@/services/data/user";

export default {
  methods: {
    /**
     * 顯示確認視窗
     */
    showConfirm() {
      const setting = new AlertParam();
      setting.title = `<span class="text-danger fw-bold">刪除帳號</span>`;
      setting.text = "一旦刪除帳號，資料就無法復原，確定要刪除嗎？";
      setting.confirmButtonColor = "var(--bs-danger)";
      setting.confirmButtonText = "刪除";
      setting.showCancelButton = true;
      setting.cancelButtonText = "取消";
      setting.cancelButtonColor = "var(--bs-success)";
      setting.focusCancel = true;
      setting.allowOutsideClick = false;

      // 開啟確認視窗
      AlertModel.getMixinModel(setting.getParamSet(), AlertModel.warningModel)
        .fire()
        .then(async (result) => {
          if (result.isConfirmed) {
            this.deleteAccount();
          }
        });
    },

    /**
     * 刪除帳號。
     */
    deleteAccount() {
      // 不具備有效登入授權則導回首頁
      if (!AuthService.checkValidPermission()) {
        Redirector.expire();
        return;
      }

      this.openLoading();

      // 刪除資料
      UserService.deleteSelf(AuthService.getToken(), this.userId)
        .then(() => {
          // 成功則進行登出
          AuthService.logout();
        })
        .catch((error) => {
          console.error(error);
          ConfirmAlert.alertErrorDetail("刪除失贁", ErrorHelper.getErrorMsg(error));
        })
        .finally(() => {
          this.closeLoading();
        });
    },

    /** loading 功能 */
    ...mapActions(useLoadingStore, {
      openLoading: "open",
      closeLoading: "close",
    }),
  },

  computed: {
    ...mapState(useUserStore, {
      userId: "id",
    }),
  },
};
</script>
