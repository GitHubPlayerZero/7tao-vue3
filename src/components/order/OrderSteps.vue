<template>
  <ol class="step-list">
    <li class="step-item">
      <div class="step-number" :class="{ 'step-active': step === 1 }">1</div>
      <div>訂單確認</div>
    </li>
    <li class="step-item">
      <div class="step-number" :class="{ 'step-active': step === 2 }">2</div>
      <div>結帳付款</div>
    </li>
    <li class="step-item">
      <p class="step-number" :class="{ 'step-active': step === 3 }">3</p>
      <p>訂購結果</p>
    </li>
  </ol>
</template>

<script>
export default {
  /**
   * @property {number} setp 第幾個步驟（1、2、3）。
   */
  props: {
    step: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/rwd";
@use "@/assets/scss/mixins/font";

/* 流程步驟列表 */
.step-list {
  display: flex;
  justify-content: space-between;
  position: relative;
  @include font.noto-serif-tc;
  font-weight: bold;

  &::before {
    content: "";
    width: 90%;
    height: 1px;
    background-color: black;
    position: absolute;
    top: 16px;
    left: 5%;
    z-index: -1;

    @include rwd.pad-up {
      top: 24px;
    }
  }
}

// 流程步驟列表 - 項目
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

// 流程步驟列表 - 數字
.step-number {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bs-body-bg);
  border: 1px solid #000;
  width: 32px;
  height: 32px;
  margin-bottom: 4px;

  // Pad 以上裝置
  @include rwd.pad-up {
    width: 48px;
    height: 48px;
    font-size: 20px;
    margin-bottom: 8px;
  }
}

// 流程步驟列表 - 目前所在步驟
.step-active {
  background-color: var(--bs-primary);
  color: var(--bs-secondary);
}
</style>
