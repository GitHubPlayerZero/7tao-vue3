<template>
  <div class="container mt-6 mt-md-15 mb-12 mb-md-15">
    <div class="row">
      <main class="col-md-7 col-xl-4 mx-auto">
        <h2 class="mb-4">
          <IconTitle title="會員註冊" />
        </h2>

        <VeeForm v-slot="{ errors }" class="d-flex flex-column" @submit="register">
          <!-- Email -->
          <div class="mb-6 mb-md-8">
            <label for="email" class="form-label required">Email（將作為帳號）</label>
            <VeeField
              type="email"
              name="email"
              id="email"
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
            <label for="password" class="form-label required">密碼（8 ~ 12 碼英數字）</label>

            <div class="d-flex align-items-center">
              <VeeField
                :type="isShowPassword ? 'text' : 'password'"
                name="password"
                id="password"
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
            <label for="confirmPassword" class="form-label required">確認密碼</label>

            <div class="d-flex align-items-center">
              <VeeField
                :type="isShowConfirmPassword ? 'text' : 'password'"
                name="confirmPassword"
                id="confirmPassword"
                :class="['form-control', 'me-3', errors.confirmPassword ? 'is-invalid' : '']"
                maxlength="12"
                placeholder="請再次輸入密碼"
                rules="required|confirmPassword:password"
                label="確認密碼"
                value="a12345678"
              />
              <PwdDisplaySwitch v-model:isShowPassword="isShowConfirmPassword" />
            </div>

            <VeeErrorMessage name="confirmPassword" class="invalid-feedback d-block" />
          </div>

          <!-- 身份證字號 -->
          <div class="mb-4">
            <label for="rocId" class="form-label required">身份證字號</label>
            <VeeField
              type="text"
              name="rocId"
              id="rocId"
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
            <label for="name" class="form-label required">姓名</label>
            <VeeField
              type="text"
              name="name"
              id="name"
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
            <label for="mobilePhone" class="form-label required">手機</label>
            <VeeField
              type="tel"
              name="mobilePhone"
              id="mobilePhone"
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

            <!-- 男 -->
            <div class="mb-6 mb-md-8 d-flex">
              <div class="form-check mb-0 me-4">
                <VeeField
                  type="radio"
                  name="gender"
                  id="genderMale"
                  value="male"
                  :class="['form-check-input', errors.gender ? 'is-invalid' : '']"
                  label="性別"
                  v-model="form.gender"
                />
                <label for="genderMale" class="form-check-label">男</label>
              </div>

              <!-- 女 -->
              <div class="form-check mb-0 me-4">
                <VeeField
                  type="radio"
                  name="gender"
                  id="genderFemale"
                  value="female"
                  :class="['form-check-input', errors.gender ? 'is-invalid' : '']"
                  v-model="form.gender"
                />
                <label for="genderFemale" class="form-check-label">女</label>
              </div>

              <!-- 無 -->
              <div class="form-check mb-0 me-4">
                <VeeField
                  type="radio"
                  name="gender"
                  id="genderOther"
                  value=""
                  :class="['form-check-input', errors.gender ? 'is-invalid' : '']"
                  v-model="form.gender"
                />
                <label for="genderOther" class="form-check-label">無</label>
              </div>

              <!-- <VeeErrorMessage name="gender" class="invalid-feedback d-block" /> -->
            </div>
          </div>

          <!-- 按鈕 -->
          <button
            type="button"
            @click="getAllUsers"
            class="btn btn-primary py-4 py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 d-flex justify-content-center align-items-center w-100 mb-3"
          >
            <span class="me-1">查詢所有使用者</span>
            <i class="icofont-rounded-double-right"></i>
          </button>

          <button
            @click="checkBeforeSubmit"
            class="btn btn-primary py-4 py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 d-flex justify-content-center align-items-center w-100 mb-3"
          >
            <span class="me-1">註冊</span>
            <i class="icofont-rounded-double-right"></i>
          </button>

          <button
            type="button"
            @click="login"
            class="btn btn-primary py-4 py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 d-flex justify-content-center align-items-center w-100 mb-3"
          >
            <span class="me-1">登入</span>
            <i class="icofont-rounded-double-right"></i>
          </button>

          <button
            type="button"
            @click="logout"
            class="btn btn-primary py-4 py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 d-flex justify-content-center align-items-center w-100 mb-3"
          >
            <span class="me-1">登出</span>
            <i class="icofont-rounded-double-right"></i>
          </button>

          <button
            type="button"
            @click="modify"
            class="btn btn-primary py-4 py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 d-flex justify-content-center align-items-center w-100 mb-3"
          >
            <span class="me-1">修改</span>
            <i class="icofont-rounded-double-right"></i>
          </button>

          <button
            type="button"
            @click="remove"
            class="btn btn-primary py-4 py-md-2 fs-18 fs-md-20 lh-1d444 lh-md-1d45 d-flex justify-content-center align-items-center w-100 mb-3"
          >
            <span class="me-1">刪除</span>
            <i class="icofont-rounded-double-right"></i>
          </button>
        </VeeForm>
      </main>

      <hr class="mt-10 mb-5" />

      <h3 class="mb-4">userStore status</h3>

      <p>
        {{ userString }}
        <br /><br />
        ID：{{ id }}
        <br />
        Name：{{ userName }}
        <br />
        Email：{{ userEmail }}
      </p>
    </div>
    <!-- row end -->
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores";
import { SysConstants, CheckHelper, ErrorHelper, CookieHelper, TimerAlert } from "@/helpers";
import { AuthService } from "@/services";
import { UserService } from "@/services/data/user";
import IconTitle from "@/components/global/IconTitle.vue";
import PwdDisplaySwitch from "@/components/global/PwdDisplaySwitch.vue";

export default {
  data() {
    return {
      CheckHelper,

      isShowPassword: false, // 是否顯示密碼，預設不顯示
      isShowConfirmPassword: false, // 是否顯示確認密碼，預設不顯示

      // 表單資料
      form: {
        email: "test2@7tao.com", // Email（帳號）
        password: "a12345678", // 密碼
        rocId: "A123456789", // 身份證字號
        name: "陳大華", // 姓名
        mobilePhone: "0912345678", // 手機
        gender: "male", // 性別
      },
    };
  },

  computed: {
    ...mapState(useUserStore, {
      id: "id",
      userName: "name",
      userEmail: "email",
    }),

    userString() {
      return this.getUserString();
    },
  },

  methods: {
    ...mapActions(useUserStore, {
      getUserString: "toString",
    }),

    /**
     * 提交前處理。
     */
    checkBeforeSubmit() {
      this.form.rocId = this.form.rocId.toUpperCase();
    },

    /**
     * 查詢所有使用者。
     */
    getAllUsers() {
      UserService.fetchAllUsers().then((res) => {
        console.log(res);
      });
    },

    /**
     * 註冊。
     */
    register() {
      console.log(``);
      console.log(`[register] 註冊資料：`, this.form);

      UserService.register(this.form)
        .then((user) => {
          console.log(`[register] 註冊成功：`, user);
          alert("註冊成功！請前往登入。");
        })
        .catch((error) => {
          console.error(`[register] 註冊失敗：`, error);
          alert(`註冊失敗：${ErrorHelper.getErrorMsg(error)}`);
        });
    },

    /**
     * 登入。
     */
    login() {
      console.log(``);
      console.log(`[login] 登入資料：`, this.form);

      UserService.login(this.form.account, this.form.password)
        .then((res) => {
          AuthService.setLoginAuth(res.accessToken, res.user); // 設定登入狀態
          console.log(`[login] 登入成功：`, res.user);
          console.log(`cookie ====>`, CookieHelper.getCookie(SysConstants.cookieTokenName));

          // 更新表單資料
          this.form = { ...this.form, ...res.user };

          TimerAlert.alertSuccess("登入成功！"); // 顯示成功訊息
        })
        .catch((error) => {
          console.error(`[login] 發生錯誤：`, error);
          this.error = `登入失敗：${ErrorHelper.getErrorMsg(error)}`;
        });
    },

    /**
     * 登出。
     */
    logout() {
      AuthService.logout();
    },

    /**
     * 修改使用者資料。
     */
    modify() {
      console.log(``);
      console.log(`[modify] 修改資料：`, this.form);

      AuthService.modifySelf(this.form)
        .then((user) => {
          console.log(`[modify] 修改成功：`, user);

          // 更新表單資料
          delete user.password; // API 所記錄之密碼為加密之後的，先將密碼移除以避免覆寫
          this.form = { ...this.form, ...user };

          alert("修改成功！");
          // this.$router.push({ path: "/dashboard" });
        })
        .catch((error) => {
          console.error(`[modify] 修改失敗：`, error);
          alert(`修改失敗：${ErrorHelper.getErrorMsg(error)}`);
        });
    },

    /**
     * 刪除使用者資料。
     */
    remove() {
      console.log(``);

      // 刪除資料
      UserService.deleteSelf(AuthService.getToken(), this.id)
        .then(() => {
          alert("刪除成功！");
          // this.$router.push({ path: "/dashboard" });
        })
        .catch((error) => {
          console.error(`[remove] 刪除失敗：`, error);
          alert(`刪除失敗：${ErrorHelper.getErrorMsg(error)}`);
        });
    },
  },

  components: { IconTitle, PwdDisplaySwitch },
};
</script>

<style lang="scss" scoped>
.required::before {
  content: "* ";
  color: red;
  font-weight: bold;
  font-size: 18px;
  margin-right: 2px;
}
</style>
