<template>
  <div class="container">
    <h1>測試</h1>

    <nav class="nav">
      <RouterLink to="/test/bs">Bootstrap</RouterLink>｜
      <RouterLink to="/test/layout">切版</RouterLink>｜
      <RouterLink to="/test/js">JS</RouterLink>｜
      <RouterLink to="/test/user">使用者</RouterLink>｜
      <RouterLink to="/test/cookie">Cookie</RouterLink>｜
      <RouterLink to="/test/errormsg">錯誤訊息</RouterLink>｜
    </nav>

    <hr />

    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  components: {
    RouterLink,
    RouterView,
  },
};
</script>

<style lang="scss" scoped>
hr {
  border: 3px solid blue;
  box-shadow: 3px 3px gray;
  margin-bottom: 32px;
}

:deep(.hr) {
  border: 2px dashed green;
  margin-top: 32px;
  margin-bottom: 32px;
}

.container {
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>
