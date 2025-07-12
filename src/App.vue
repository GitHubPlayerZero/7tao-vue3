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
</template>

<script setup>
import { RouterView } from "vue-router";
import Header from "./components/global/header/Header.vue";
</script>
