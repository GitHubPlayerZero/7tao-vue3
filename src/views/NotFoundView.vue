<template>
  <SimpleMsg message="頁面不存在！" />

  <div class="container py-4 text-center font-noto-sans-tc">
    <p class="mb-4 fs-18">{{ countdown }} 秒後將自動跳轉回首頁...</p>
    <button type="button" class="btn btn-primary py-2 px-5" @click="goHome">立即回首頁</button>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import SimpleMsg from "@/components/global/SimpleMsg.vue";

const router = useRouter();

/**
 * 回首頁。
 */
function goHome() {
  router.replace("/");
}

/**
 * 倒數計時
 */
const countdown = ref(10); // 初始秒數

// 每秒遞減
let timer = setInterval(() => {
  if (--countdown.value <= 0) {
    goHome();
  }
}, 1000);

// 頁面銷毀時一併清除倒數計時
onUnmounted(() => {
  clearInterval(timer);
});
</script>
