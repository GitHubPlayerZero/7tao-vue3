<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="container mt-3">
      <RouterLink to="/test">Test</RouterLink>｜
      <RouterLink to="/">首頁</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss">
@use "./assets/scss/all.scss";
</style>
