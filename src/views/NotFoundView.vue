<template>
  <div class="container py-4 text-center font-noto-sans-tc flex-shrink-0 flex-grow-1">
    <SimpleMsg message="頁面不存在！" />
    <br />
    <p class="mb-4 fs-18">{{ timer.countdown }} 秒後將自動跳轉回首頁...</p>
    <button type="button" class="btn btn-primary py-2 px-5" @click="goHome">立即回首頁</button>
  </div>
</template>

<script setup>
import { onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useTimer } from "@/composables";
import SimpleMsg from "@/components/global/SimpleMsg.vue";

const router = useRouter();

/**
 * 回首頁。
 */
function goHome() {
  router.replace("/");
}

// 進行倒數計時
const timer = useTimer(10, goHome);
timer.start();

// 頁面銷毀時一併清除倒數計時
onUnmounted(() => {
  timer.clear();
});
</script>
