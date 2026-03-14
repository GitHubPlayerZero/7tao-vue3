<template>
  <div class="container mt-6 mt-md-15 mb-12 mb-md-15">
    <div class="row">
      <main class="col-md-7 col-xl-4 mx-auto">
        <h2 class="mb-4">
          <IconTitle title="會員資料" />
        </h2>

        <!-- 修改基本資料 -->
        <section>
          <h3>修改基本資料</h3>

          <VeeForm
            ref="dataForm"
            v-slot="{ errors }"
            class="d-flex flex-column"
            @submit="modifyData"
          >
            <!-- Email -->
            <div class="mb-4">
              <label class="form-label">Email（不可修改）</label>
              <VeeField type="text" name="email" class="form-control" disabled="disabled" />
            </div>

            <!-- 身份證字號 -->
            <div class="mb-4">
              <label class="form-label required">身份證字號（不可修改）</label>
              <VeeField type="text" name="rocId" class="form-control" disabled="disabled" />
            </div>

            <!-- 姓名 -->
            <div class="mb-6 mb-md-8">
              <label for="modifyName" class="form-label required">姓名</label>
              <VeeField
                type="text"
                name="name"
                id="modifyName"
                :class="['form-control', errors.name ? 'is-invalid' : '']"
                placeholder="請輸入姓名"
                rules="required"
                label="姓名"
                v-model="dataForm.name"
              />
              <VeeErrorMessage name="name" class="invalid-feedback" />
            </div>

            <!-- 手機 -->
            <div class="mb-6 mb-md-8">
              <label for="modifyMobilePhone" class="form-label required">手機</label>
              <VeeField
                type="tel"
                name="mobilePhone"
                id="modifyMobilePhone"
                :class="['form-control', errors.mobilePhone ? 'is-invalid' : '']"
                placeholder="範例：0912345678"
                :rules="{ required: true, regex: CheckHelper.mobilePhonePattern }"
                label="手機"
                v-model="dataForm.mobilePhone"
              />
              <VeeErrorMessage name="mobilePhone" class="invalid-feedback" />
            </div>

            <!-- 性別 -->
            <div class="font-noto-sans-tc">
              <div class="form-label">性別</div>

              <div class="mb-6 mb-md-8 d-flex">
                <!-- 男 -->
                <div class="form-check mb-0 me-1">
                  <VeeField
                    type="radio"
                    name="gender"
                    id="modifyGenderMale"
                    value="male"
                    :class="['form-check-input', errors.gender ? 'is-invalid' : '']"
                    label="性別"
                    v-model="dataForm.gender"
                  />
                  <label for="modifyGenderMale" class="form-check-label">
                    男&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                </div>

                <!-- 女 -->
                <div class="form-check mb-0 me-1">
                  <VeeField
                    type="radio"
                    name="gender"
                    id="modifyGenderFemale"
                    value="female"
                    :class="['form-check-input', errors.gender ? 'is-invalid' : '']"
                    v-model="dataForm.gender"
                  />
                  <label for="modifyGenderFemale" class="form-check-label">
                    女&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                </div>

                <!-- 無 -->
                <div class="form-check mb-0 me-1">
                  <VeeField
                    type="radio"
                    name="gender"
                    id="modifyGenderOther"
                    value=""
                    :class="['form-check-input', errors.gender ? 'is-invalid' : '']"
                    v-model="dataForm.gender"
                  />
                  <label for="modifyGenderOther" class="form-check-label">
                    無&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                </div>
              </div>
            </div>

            <!-- 按鈕 -->
            <button class="btn btn-primary py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 mb-3">
              <span class="btn-primary-text">修改基本資料</span>
              <i class="icofont-rounded-double-right"></i>
            </button>
          </VeeForm>
        </section>

        <hr />

        <!-- 修改密碼 -->
        <section>
          <h3>修改密碼</h3>

          <VeeForm
            ref="passwordForm"
            v-slot="{ errors }"
            class="d-flex flex-column"
            @submit="modifyPassword"
          >
            <!-- 密碼 -->
            <div class="mb-6 mb-md-8">
              <label for="modifyPassword" class="form-label required"
                >新密碼（8 ~ 12 碼英數字）</label
              >

              <div class="d-flex align-items-center">
                <VeeField
                  :type="isShowPassword ? 'text' : 'password'"
                  name="password"
                  id="modifyPassword"
                  :class="['form-control', 'me-3', errors.password ? 'is-invalid' : '']"
                  placeholder="請輸入密碼"
                  maxlength="12"
                  rules="required|password"
                  label="密碼"
                  v-model="passwordForm.password"
                />
                <PwdDisplaySwitch v-model:isShowPassword="isShowPassword" />
              </div>

              <VeeErrorMessage name="password" class="invalid-feedback d-block" />
            </div>

            <!-- 確認密碼 -->
            <div class="mb-6 mb-md-8">
              <label for="modifyConfirmPassword" class="form-label required">確認密碼</label>

              <div class="d-flex align-items-center">
                <VeeField
                  :type="isShowConfirmPassword ? 'text' : 'password'"
                  name="confirmPassword"
                  id="modifyConfirmPassword"
                  :class="['form-control', 'me-3', errors.confirmPassword ? 'is-invalid' : '']"
                  maxlength="12"
                  placeholder="請再次輸入密碼"
                  rules="required|confirmPassword:password"
                  label="確認密碼"
                />
                <PwdDisplaySwitch v-model:isShowPassword="isShowConfirmPassword" />
              </div>

              <VeeErrorMessage name="confirmPassword" class="invalid-feedback d-block" />
            </div>

            <!-- 按鈕 -->
            <button class="btn btn-primary py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 mb-3">
              <span class="btn-primary-text">修改密碼</span>
              <i class="icofont-rounded-double-right"></i>
            </button>
          </VeeForm>
        </section>

        <hr />

        <!-- 刪除帳號 -->
        <DeleteAccount />
      </main>
    </div>
    <!-- row end -->
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useLoadingStore, useUserStore } from "@/stores";
import { ErrorHelper, CheckHelper, ConfirmAlert, TimerAlert } from "@/helpers";
import { AuthService, Redirector } from "@/services";
import IconTitle from "@/components/global/IconTitle.vue";
import PwdDisplaySwitch from "@/components/global/PwdDisplaySwitch.vue";
import DeleteAccount from "@/components/auth/DeleteAccount.vue";

export default {
  data() {
    return {
      CheckHelper, // 驗證工具
      isShowPassword: false, // 是否顯示密碼，預設不顯示
      isShowConfirmPassword: false, // 是否顯示確認密碼，預設不顯示

      // 修改基本資料表單（最後會送出的資料）
      dataForm: {
        name: "", // 姓名
        mobilePhone: "", // 手機
        gender: "", // 性別
      },

      // 修改密碼表單（最後會送出的資料）
      passwordForm: {
        password: "", // 密碼
      },
    };
  },

  // 掛載
  mounted() {
    this.openLoading();

    // 取得使用者資料
    this.getUser()
      .then((data) => {
        // 設定開放修改的表單資料
        this.dataForm = {
          name: data.name,
          mobilePhone: data.mobilePhone,
          gender: data.gender,
        };

        // 以 VeeValidate 設定表單其他資料
        this.$refs.dataForm.setValues({
          id: data.id,
          email: data.email,
          rocId: data.rocId,
        });
      })
      .catch((error) => {
        console.error(error);
        console.error(`[mounted] 設定資料失敗：`, ErrorHelper.getErrorMsg(error));
      })
      .finally(() => {
        this.closeLoading();
      });
  },

  methods: {
    /**
     * 修改資料的共用方法。
     * @param {Object} data 表單資料。
     * @param {string} consoleTitle 用於 console 的標題，以區分不同方法的 log，預設為 "modify"。
     */
    modify(data, consoleTitle = "modify") {
      // 不具備有效登入授權則導回首頁
      if (!AuthService.checkValidPermission()) {
        Redirector.expire();
        return;
      }

      this.openLoading();

      // 修改使用者資料
      this.modifyUser(data)
        .then(() => {
          TimerAlert.alertSuccess("修改成功");
        })
        .catch((error) => {
          console.error(error);

          const errorMsg = ErrorHelper.getErrorMsg(error);
          console.error(`[${consoleTitle}] 執行失敗：`, errorMsg);
          ConfirmAlert.alertErrorDetail("修改失敗", errorMsg);
        })
        .finally(() => {
          this.closeLoading();
        });
    },

    /**
     * 修改基本資料。
     */
    modifyData() {
      this.modify(this.dataForm, "modifyData");
    },

    /**
     * 修改密碼。
     */
    modifyPassword() {
      this.modify(this.passwordForm, "modifyPassword");
    },

    /** loading 功能 */
    ...mapActions(useLoadingStore, {
      openLoading: "open",
      closeLoading: "close",
    }),

    /** User 資料功能 */
    ...mapActions(useUserStore, {
      getUser: "get",
      modifyUser: "modify",
    }),
  },

  components: { IconTitle, PwdDisplaySwitch, DeleteAccount },
};
</script>

<style lang="scss" scoped>
:deep(h3) {
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5;
  text-decoration: underline;
  margin-bottom: 8px;
}

hr {
  border-width: 3px;
  margin-top: 32px;
  margin-bottom: 40px;
}
</style>
