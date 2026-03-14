<template>
  <MyModal ref="loginModal" id="loginModal" title="登入" @emit-shown="shown">
    <!-- Modal Body -->
    <template #modalBody>
      <div class="container-fluid">
        <div class="row">
          <main class="col-md-8 col-xl-6 mx-auto">
            <h2 class="mb-4">
              <IconTitle title="會員登入" />
            </h2>

            <p class="mb-5">
              還沒有帳號嗎？
              <a href="#" class="modal-link" @click.prevent="switchToRegister">立即註冊</a>
            </p>

            <VeeForm ref="loginForm" v-slot="{ errors }" class="d-flex flex-column" @submit="login">
              <!-- 帳號 -->
              <div class="mb-4">
                <label for="loginAccount" class="form-label required">帳號</label>
                <VeeField
                  type="text"
                  name="account"
                  id="loginAccount"
                  :class="['form-control', errors.account ? 'is-invalid' : '']"
                  placeholder="請輸入帳號"
                  rules="required"
                  label="帳號"
                />
                <VeeErrorMessage name="account" class="invalid-feedback" />
              </div>

              <!-- 密碼 -->
              <div class="mb-6 mb-md-8">
                <label for="loginPassword" class="form-label required">
                  密碼（8 ~ 12 碼英數字）
                </label>

                <div class="d-flex align-items-center">
                  <VeeField
                    :type="isShowPassword ? 'text' : 'password'"
                    name="password"
                    id="loginPassword"
                    :class="['form-control', 'me-3', errors.password ? 'is-invalid' : '']"
                    placeholder="請輸入密碼"
                    maxlength="12"
                    rules="required|password"
                    label="密碼"
                  />
                  <PwdDisplaySwitch v-model:isShowPassword="isShowPassword" />
                </div>

                <VeeErrorMessage name="password" class="invalid-feedback d-block" />
              </div>

              <!-- 登入按鈕 -->
              <button
                class="btn btn-primary py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45"
              >
                <span class="btn-primary-text">登入</span>
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
        {{ errorMsg }}
      </div>
      <!-- TODO 測試 -->
      <button type="button" class="btn btn-warning py-2 px-4" @click="test">測試</button>
    </template>
  </MyModal>
</template>

<script setup>
import { inject, onMounted, ref, useTemplateRef } from "vue";
import { useLoadingStore } from "@/stores";
import { ErrorHelper, TimerAlert } from "@/helpers";
import { AuthService } from "@/services";
import { UserService } from "@/services/data/user";
import IconTitle from "@/components/global/IconTitle.vue";
import PwdDisplaySwitch from "@/components/global/PwdDisplaySwitch.vue";
import MyModal from "@/components/global/MyModal.vue";

/**
 * 開啟註冊視窗（由父元件注入）。
 * 若父元件未注入則使用預設函式顯示錯誤訊息。
 * @type {Function}
 */
const openRegisterModal = inject("openRegisterModal", () => {
  console.error(`[openRegisterModal] 未注入！`);
});

const loading = useLoadingStore(); // Store - Loading
const refLoginModal = useTemplateRef("loginModal"); // 參考 - MyModal 元件
const refLoginForm = useTemplateRef("loginForm"); // 參考 - VeeValidate Form 元件
const isShowPassword = ref(false); // 是否顯示密碼，預設不顯示
const errorMsg = ref(""); // 錯誤訊息

// 元素 - 帳號輸入框
// 由於使用 VeeField 元件，無法直接使用 ref 取得元素，因此在掛載時使用 JS 做法取得元素
const elAccount = ref(null);

// 掛載時
onMounted(() => {
  elAccount.value = document.querySelector("#loginAccount");
});

// TODO test
function test() {
  refLoginForm.value.setValues({
    account: "test2@7tao.com",
    password: "a12345678",
  });
}

/**
 * 切換到註冊功能。
 */
function switchToRegister() {
  refLoginModal.value.state.close(); // 關閉 Modal
  openRegisterModal(); // 開啟註冊視窗
}

/**
 * 將資料還原初始值。
 */
function resetData() {
  refLoginForm.value.resetForm();
  isShowPassword.value = false;
  errorMsg.value = "";
}

/**
 * 登入。
 * @param {Object} values 表單資料，由子元件傳入。
 */
function login(values) {
  loading.open();

  UserService.login(values.account, values.password)
    .then((res) => {
      AuthService.setLoginAuth(res.accessToken, res.user); // 設定登入狀態
      refLoginModal.value.state.close(); // 關閉 Modal
      resetData(); // 還原資料
      TimerAlert.alertSuccess("登入成功！"); // 顯示成功訊息
    })
    .catch((error) => {
      console.error(`[login] 發生錯誤：`, error);
      errorMsg.value = `登入失敗：${ErrorHelper.getErrorMsg(error)}`;
    })
    .finally(() => {
      loading.close();
    });
}

/**
 * Modal 視窗顯示時的動作。
 */
function shown() {
  elAccount.value?.focus();
}

/**
 * 定義提供給父元件的方法及屬性。
 * 對於使用 Composition API 撰寫的元件，內部方法及屬性預設均不會暴露。
 * 需使用 defineExpose() 定義可提供給父元件的方法及屬性。
 */
defineExpose({
  get state() {
    return refLoginModal.value.state;
  },
});
</script>
