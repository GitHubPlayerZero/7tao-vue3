<template>
  <div
    class="py-4 py-md-6 d-flex font-noto-serif-tc letter-spacing-10 fs-md-32 fw-bold text-secondary bg-primary white-space-nowrap overflow-hidden"
  >
    <div :class="classes" v-for="i in 2" :key="i">
      活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・活動集錦・ALBUMS・
    </div>
  </div>
</template>

<script>
// TODO 待檢查優化
export default {
  props: {
    /** 是否反向捲動？（預設往左捲動） */
    isReverse: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      classes: ["scroll"],
    };
  },

  created() {
    // 依據 props 的需求設定 class
    if (this.isReverse) {
      this.classes.push("reverse");
    }
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  animation-name: scroll;
  animation-duration: 150s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  &.reverse {
    animation-direction: reverse;
  }
}

// 捲動，預設往左
@keyframes scroll {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
