<template>
  <ul class="d-flex flex-column flex-md-row column-gap-6 row-gap-4 py-6 py-md-0 fs-18 lh-1d155">
    <!-- 註冊 -->
    <li>
      <a href="#" class="hover-color" @click.prevent>
        <i class="icofont-ui-file me-2px"></i>
        <span>REGISTER</span>
      </a>
    </li>
    <!-- 登入 -->
    <li>
      <a href="#" class="hover-color" @click.prevent>
        <i class="icofont-ui-user me-2px"></i>
        <span>LOGIN</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  components: {},
};
</script>

<style lang="scss" scoped>
.hover-color {
  &:hover {
    color: #9c9e18;
  }
}
</style>
