<template>
  <!-- 使用者折疊選單內容 -->
  <div v-if="user.id" class="py-6 fs-18 lh-1d155">
    <p class="mb-4">{{ `您好，${user.name}` }}</p>

    <ul class="d-flex flex-column column-gap-6 row-gap-4">
      <li>
        <router-link :to="{ name: 'modifyUser' }" @click="closeMenu" class="hover-color">
          <i class="icofont-ui-user me-2px"></i>
          <span>會員資料</span>
        </router-link>
      </li>
      <li>
        <a href="#" class="hover-color" @click.prevent="logout">
          <i class="icofont-logout me-2px"></i>
          <span>登出</span>
        </a>
      </li>
    </ul>
  </div>

  <!-- 未登入時各裝置共用的選單 -->
  <ul
    v-else
    class="d-flex flex-column flex-md-row column-gap-6 row-gap-4 py-6 py-md-0 fs-18 lh-1d155"
  >
    <!-- 註冊 -->
    <li>
      <a href="#" class="hover-color" @click.prevent="openRegisterModal">
        <i class="icofont-ui-file me-2px"></i>
        <span>REGISTER</span>
      </a>
    </li>

    <!-- 登入 -->
    <li>
      <a href="#" class="hover-color" @click.prevent="openLoginModal">
        <i class="icofont-ui-user me-2px"></i>
        <span>LOGIN</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
import { inject } from "vue";
import { useUserStore } from "@/stores";
import { AuthService } from "@/services";

const user = useUserStore();

/**
 * 關閉折疊選單。
 * 若父元件未注入則使用預設函式顯示錯誤訊息。
 * @type {Function}
 */
const closeMenu = inject("closeMenu", () => {
  console.error(`[closeMenu] 未注入！`);
});

/**
 * 開啟註冊視窗（由父元件注入）。
 * 若父元件未注入則使用預設函式顯示錯誤訊息。
 * @type {Function}
 */
const openRegisterModal = inject("openRegisterModal", () => {
  console.error(`[openRegisterModal] 未注入！`);
});

/**
 * 開啟登入視窗（由父元件注入）。
 * 若父元件未注入則使用預設函式顯示錯誤訊息。
 * @type {Function}
 */
const openLoginModal = inject("openLoginModal", () => {
  console.error(`[openLoginModal] 未注入！`);
});

/**
 * 登出。
 */
function logout() {
  AuthService.logout();
}
</script>

<style lang="scss" scoped>
.hover-color {
  &:hover {
    color: var(--bs-hover);
  }
}
</style>
