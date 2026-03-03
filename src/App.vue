<template>
  <!-- 全域 Header -->
  <Header />

  <!-- 主要內容區 -->
  <RouterView />

  <!-- 全域 Footer -->
  <footer class="py-6 py-md-8 border-top border-3 border-primary">
    <p class="fs-14 fs-md-16 lh-1d448 font-noto-sans-tc text-center">
      © 7TAO七逃. All Rights Reserved
    </p>
  </footer>

  <!-- Modal -->
  <RegisterModal ref="registerModal" />
  <LoginModal ref="loginModal" />
</template>

<script setup>
import { provide, useTemplateRef } from "vue";
import { RouterView } from "vue-router";
import RegisterModal from "@/components/auth/RegisterModal.vue";
import LoginModal from "@/components/auth/LoginModal.vue";
import Header from "./components/global/header/Header.vue";

// Modal 相關
const refRegisterModal = useTemplateRef("registerModal"); // 參考 - 註冊視窗元件
const refLoginModal = useTemplateRef("loginModal"); // 參考 - 登入視窗元件

/**
 * 開啟註冊視窗。
 */
function openRegisterModal() {
  refRegisterModal.value.state.open();
}

/**
 * 開啟登入視窗。
 */
function openLoginModal() {
  refLoginModal.value.state.open();
}

// 提供給子元件使用
provide("openRegisterModal", openRegisterModal);
provide("openLoginModal", openLoginModal);
</script>
