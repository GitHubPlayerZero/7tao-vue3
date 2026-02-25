<template>
  <MyModal ref="registerModal" id="registerModal" title="註冊" @emit-shown="shown">
    <!-- Modal Body -->
    <template #modalBody>
      <div class="container-fluid">
        <div class="row">
          <main class="col-md-7 col-xl-4 mx-auto">
            <h2 class="mb-4">
              <IconTitle title="註冊" />
            </h2>

            <VeeForm
              ref="registerForm"
              v-slot="{ errors }"
              class="d-flex flex-column"
              @submit="register"
            >
              <!-- Email -->
              <div class="mb-6 mb-md-8">
                <label for="registerEmail" class="form-label required">Email（將作為帳號）</label>
                <VeeField
                  type="email"
                  name="email"
                  id="registerEmail"
                  :class="['form-control', errors.email ? 'is-invalid' : '']"
                  placeholder="請輸入 Email"
                  rules="required|email"
                  label="Email"
                  v-model="form.email"
                />
                <VeeErrorMessage name="email" class="invalid-feedback" />
              </div>

              <!-- 密碼 -->
              <div class="mb-6 mb-md-8">
                <label for="registerPassword" class="form-label required"
                  >密碼（8 ~ 12 碼英數字）</label
                >

                <div class="d-flex align-items-center">
                  <VeeField
                    :type="isShowPassword ? 'text' : 'password'"
                    name="password"
                    id="registerPassword"
                    :class="['form-control', 'me-3', errors.password ? 'is-invalid' : '']"
                    placeholder="請輸入密碼"
                    maxlength="12"
                    rules="required|password"
                    label="密碼"
                    v-model="form.password"
                  />
                  <PwdDisplaySwitch v-model:isShowPassword="isShowPassword" />
                </div>

                <VeeErrorMessage name="password" class="invalid-feedback d-block" />
              </div>

              <!-- 確認密碼 -->
              <div class="mb-6 mb-md-8">
                <label for="registerConfirmPassword" class="form-label required">確認密碼</label>

                <div class="d-flex align-items-center">
                  <VeeField
                    :type="isShowConfirmPassword ? 'text' : 'password'"
                    name="confirmPassword"
                    id="registerConfirmPassword"
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

              <!-- 身份證字號 -->
              <div class="mb-4">
                <label for="registerRocId" class="form-label required">身份證字號</label>
                <VeeField
                  type="text"
                  name="rocId"
                  id="registerRocId"
                  :class="['form-control', errors.rocId ? 'is-invalid' : '']"
                  placeholder="請輸入身份證字號"
                  rules="required|rocId"
                  label="身份證字號"
                  v-model="form.rocId"
                />
                <VeeErrorMessage name="rocId" class="invalid-feedback" />
              </div>

              <!-- 姓名 -->
              <div class="mb-6 mb-md-8">
                <label for="registerName" class="form-label required">姓名</label>
                <VeeField
                  type="text"
                  name="name"
                  id="registerName"
                  :class="['form-control', errors.name ? 'is-invalid' : '']"
                  placeholder="請輸入姓名"
                  rules="required"
                  label="姓名"
                  v-model="form.name"
                />
                <VeeErrorMessage name="name" class="invalid-feedback" />
              </div>

              <!-- 手機 -->
              <div class="mb-6 mb-md-8">
                <label for="registerMobilePhone" class="form-label required">手機</label>
                <VeeField
                  type="tel"
                  name="mobilePhone"
                  id="registerMobilePhone"
                  :class="['form-control', errors.mobilePhone ? 'is-invalid' : '']"
                  placeholder="範例：0912345678"
                  :rules="{ required: true, regex: CheckHelper.mobilePhonePattern }"
                  label="手機"
                  v-model="form.mobilePhone"
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
                      id="registerGenderMale"
                      value="male"
                      :class="['form-check-input', errors.gender ? 'is-invalid' : '']"
                      label="性別"
                      v-model="form.gender"
                    />
                    <label for="registerGenderMale" class="form-check-label">
                      男&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>

                  <!-- 女 -->
                  <div class="form-check mb-0 me-1">
                    <VeeField
                      type="radio"
                      name="gender"
                      id="registerGenderFemale"
                      value="female"
                      :class="['form-check-input', errors.gender ? 'is-invalid' : '']"
                      v-model="form.gender"
                    />
                    <label for="registerGenderFemale" class="form-check-label">
                      女&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>

                  <!-- 無 -->
                  <div class="form-check mb-0 me-1">
                    <VeeField
                      type="radio"
                      name="gender"
                      id="registerGenderOther"
                      value=""
                      :class="['form-check-input', errors.gender ? 'is-invalid' : '']"
                      v-model="form.gender"
                    />
                    <label for="registerGenderOther" class="form-check-label">
                      無&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                  </div>
                </div>
              </div>

              <!-- 按鈕 -->
              <button
                @click="checkBeforeSubmit"
                class="btn btn-primary py-4 py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 d-flex justify-content-center align-items-center w-100 mb-3"
              >
                <span class="me-1">註冊</span>
                <i class="icofont-rounded-double-right"></i>
              </button>
            </VeeForm>
          </main>
        </div>
        <!-- row end -->
      </div>
    </template>
    <!-- Modal Body - end -->

    <!-- Modal Footer -->
    <template #modalFooter>
      <div class="flex-grow-1 text-center text-danger fw-bold">
        {{ error }}
      </div>
      <!-- TODO 測試 -->
      <button type="button" class="btn btn-warning py-2 px-4" @click="test">測試</button>
    </template>
  </MyModal>
</template>

<script>
import { mapActions } from "pinia";
import { useLoadingStore } from "@/stores";
import { CheckHelper, ErrorHelper, TimerAlert, CountdownCallbackTimerParam } from "@/helpers";
import { AuthService } from "@/services";
import { UserService } from "@/services/data/user";
import IconTitle from "@/components/global/IconTitle.vue";
import PwdDisplaySwitch from "@/components/global/PwdDisplaySwitch.vue";
import MyModal from "@/components/global/MyModal.vue";

export default {
  data() {
    return {
      CheckHelper, // 驗證工具
      isShowPassword: false, // 是否顯示密碼，預設不顯示
      isShowConfirmPassword: false, // 是否顯示確認密碼，預設不顯示
      error: "", // 錯誤訊息
      elEmail: null, // 元素 - Email（帳號）輸入框

      // 表單（最後會送出的資料）
      form: {
        email: "", // Email（帳號）
        password: "", // 密碼
        rocId: "", // 身份證字號
        name: "", // 姓名
        mobilePhone: "", // 手機
        gender: "", // 性別
      },
    };
  },

  // 掛載
  mounted() {
    this.elEmail = document.querySelector("#registerEmail");
  },

  methods: {
    /**
     * 將資料還原初始值。
     */
    resetData() {
      this.$refs.registerForm.resetForm();
      this.isShowPassword = false;
      this.isShowConfirmPassword = false;
      this.error = "";
    },

    // TODO test
    test() {
      this.$refs.registerForm.setValues({
        confirmPassword: "a12345678", // 確認密碼
      });

      this.form = {
        email: "test2@7tao.com", // Email（帳號）
        password: "a12345678", // 密碼
        rocId: "A123456789", // 身份證字號
        name: "陳大華", // 姓名
        mobilePhone: "0912345678", // 手機
        gender: "", // 性別
      };
    },

    /**
     * 提交前的處理。
     * 這邊利用了表單的特性，刻意使用 submit button，並且在表單加上 submit 的動作。
     * 這樣不僅可以使用「隱式提交」（在輸入框中按下 Enter 即可觸發提交），且提交的觸發順序為：submit button → 表單檢核 → 檢核通過才會送出。
     * 如此，也能在 submit button 的 click 動作中設定一些表單檢核的前置作業。
     */
    checkBeforeSubmit() {
      // 身份證字號轉大寫
      this.form.rocId = this.form.rocId.toUpperCase();
    },

    /**
     * 註冊。
     */
    register() {
      this.openLoading();

      UserService.register(this.form)
        .then((res) => {
          this.$refs.registerModal.state.close(); // 關閉 Modal
          this.resetData(); // 還原資料
          this.autoLogin(res.accessToken, res.user); // 自動登入
        })
        .catch((error) => {
          console.error(error);

          const errorMsg = ErrorHelper.getErrorMsg(error);
          console.error(`[register] 發生錯誤：`, errorMsg);
          this.error = `註冊失敗：${errorMsg}`;
        })
        .finally(() => {
          this.closeLoading();
        });
    },

    /**
     * 自動登入。
     * @param {string} token Token。
     * @param {UserData} user 使用者資料。
     */
    autoLogin(token, user) {
      const param = new CountdownCallbackTimerParam();

      param.callback = () => {
        AuthService.setLoginAuth(token, user); // 設定登入狀態
      };

      param.title = "註冊成功！";
      param.desc = "將為您自動登入，若不想登入請點擊「離開」。";
      param.showConfirmButton = true;
      param.confirmButtonText = "立即登入";
      param.showDenyButton = true;
      param.denyButtonText = "離開";
      TimerAlert.alertCountdownCallback(param);
    },

    /**
     * Modal 視窗顯示時的動作。
     */
    shown() {
      this.elEmail?.focus();
    },

    /** loading 功能 */
    ...mapActions(useLoadingStore, {
      openLoading: "open",
      closeLoading: "close",
    }),
  },

  computed: {
    state() {
      return this.$refs.registerModal.state;
    },
  },

  /**
   * 定義提供給父元件的方法及屬性。
   * 對於使用 Options API 撰寫的元件，內部方法及屬性預設會全部暴露。
   * 當使用 expose 規範之後，只有規範內的方法及屬性才會暴露給父元件。
   */
  expose: ["state"],

  components: { IconTitle, PwdDisplaySwitch, MyModal },
};
</script>
