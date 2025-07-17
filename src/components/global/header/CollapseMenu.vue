<template>
  <!-- Header 各裝置共用的選單 -->
  <ul class="d-flex flex-column flex-md-row column-gap-6 row-gap-4 py-6 py-md-0 fs-18 lh-1d155">
    <!-- 註冊 -->
    <li>
      <a href="#" class="hover-color" @click.prevent="register">
        <i class="icofont-ui-file me-2px"></i>
        <span>REGISTER</span>
      </a>
    </li>
    <!-- 登入 -->
    <li>
      <a href="#" class="hover-color" @click.prevent="login">
        <i class="icofont-ui-user me-2px"></i>
        <span>LOGIN</span>
      </a>
    </li>
  </ul>
</template>

<script>
import { ConfirmAlert } from '@/helpers';

export default {
  methods: {
    /**
     * 註冊
     * @param {Event} e 點擊事件物件
     */
    // eslint-disable-next-line no-unused-vars
    register(e) {
      // TODO 註冊功能
      ConfirmAlert.alertWarningDetail("施工中...", "註冊功能尚未開放，敬請期待！");
    },

    /**
     * 登入
     * @param {Event} e 點擊事件物件
     */
    // eslint-disable-next-line no-unused-vars
    login(e) {
      // TODO 登入功能
      ConfirmAlert.alertWarningDetail("施工中...", "登入功能尚未開放，敬請期待！");
    },
  },
};
</script>

<style lang="scss" scoped>
.hover-color {
  &:hover {
    color: #9c9e18;
  }
}
</style>
