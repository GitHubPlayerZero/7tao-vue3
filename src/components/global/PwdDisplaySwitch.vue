<template>
  <!-- 切換密碼顯示的按鈕 -->
  <button
    type="button"
    class="d-flex fs-32 border-0 p-0"
    @click="$emit('update:isShowPassword', !isShowPassword)"
  >
    <i v-if="isShowPassword" class="icofont-eye" title="按一下隱藏密碼"></i>
    <i v-else class="icofont-eye-blocked" title="按一下顯示密碼"></i>
  </button>
</template>

<script>
export default {
  props: {
    isShowPassword: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:isShowPassword"],
};
</script>
