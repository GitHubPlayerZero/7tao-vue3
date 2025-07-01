<template>
  <section
    class="p-3 pb-8 p-md-4 pb-md-12 border border-2 border-primary position-relative"
    :class="classRotate"
  >
    <div class="card-label fw-bold bg-white position-absolute py-2 px-4">{{ album.label }}</div>
    <img
      :src="album.img"
      :alt="album.title"
      class="mb-3 mb-md-4 ratio-1 object-fit-cover"
      loading="lazy"
    />
    <h3 class="fw-bold fs-18 font-noto-serif-tc">{{ album.title }}</h3>
  </section>
</template>

<script>
export default {
  props: {
    /** 卡片 index，用來換算卡片樣式 */
    index: {
      type: Number,
      default: 0,
    },
    /* 相簿資料 */
    album: Object,
  },

  /**
   * 定義 data 回傳的內容。
   * @typedef {Object} Data
   * @property {string} classRotate rotate 的 class，預設空值（不做 rotate）。
   */
  /**
   * @returns { Data }
   */
  data() {
    return {
      classRotate: "",
    };
  },

  created() {
    /** 一組卡片的數量 */
    const groupNumber = 4;
    /** 此卡片在此組中所屬的模式 */
    const mode = this.index % groupNumber;

    switch (mode) {
      case 0:
        break;
      case 1:
        this.classRotate = "rotate-2";
        break;
      case 2:
        this.classRotate = "rotate-n2";
        break;
      case 3:
        this.classRotate = "rotate-2";
        break;
    }
  },
};
</script>

<style lang="scss" scoped>
// 卡片 - 標籤
.card-label {
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-4deg);
}
</style>
