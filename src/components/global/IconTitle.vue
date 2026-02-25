<template>
  <div class="text-center mb-4"><i class="fs-32" :class="icon"></i></div>
  <div class="text-center fw-bold fs-24 lh-1d417 letter-spacing-5">{{ title }}</div>
</template>

<script>
export default {
  props: {
    /**
     * @property {string} icon 圖示的 class 名稱。
     */
    icon: {
      type: String,
      default: "icofont-star-alt-1",
    },
    /**
     * @property {string} title 標題文字。
     */
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
