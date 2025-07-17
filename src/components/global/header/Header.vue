<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="py-3 py-md-6 border-2 border-md-3 border-bottom border-primary">
    <div class="container">
      <nav class="navbar">
        <div class="d-flex align-items-center">
          <!-- 主標題 -->
          <h1 class="me-25px me-md-12">
            <RouterLink to="/" class="d-flex align-items-center">
              <img src="@/assets/images/logo.png" alt="logo" class="logo" />
              <span class="d-none d-xl-inline-block fs-32 ms-4 me-1">7TAO</span>
              <span class="d-none d-xl-inline-block fs-16 fw-bold">活動訂票網</span>
            </RouterLink>
          </h1>

          <!-- TODO 搜尋功能 -->
          <!-- <div class="search input-group">
            <input
              type="text"
              class="search-input form-control"
              placeholder="探索活動"
              aria-label="探索活動"
            />
            <button class="search-btn btn btn-primary" type="button">
              <i class="icofont-search-1 text-secondary fs-15 fs-md-19"></i>
            </button>
          </div> -->
        </div>

        <!-- 平板以上選單 -->
        <div class="d-none d-md-block">
          <CollapseMenu />
        </div>
        <!-- 手機版折疊選單按鈕 -->
        <button
          class="navbar-toggler d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseMenu"
          aria-controls="collapseMenu"
          aria-expanded="false"
          aria-label="展開選單"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
    <!-- container end -->
  </header>

  <!-- 手機折疊選單內容 -->
  <div class="collapse navbar-collapse d-md-none" id="collapseMenu" @click.stop>
    <div class="container">
      <CollapseMenu />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import CollapseMenu from "./CollapseMenu.vue";

onMounted(() => {
  // 元素 - 折疊選單
  const elemMenu = document.querySelector("#collapseMenu");

  // 顯示折疊選單的 class 名稱
  const classShow = "show";

  /**
   * 關閉折疊選單。
   */
  function closeMenu() {
    const menuClasses = elemMenu.classList;
    if (menuClasses.contains(classShow)) {
      menuClasses.remove(classShow);
    }
  }

  // 以下動作均會觸發關閉折疊選單
  ["click", "keydown", "scroll"].forEach((eventItem) => {
    document.addEventListener(eventItem, closeMenu);
  });
  // 改變視窗大小時關閉折疊選單
  window.addEventListener("resize", closeMenu);
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/rwd";

.logo {
  width: 40px;
  height: 40px;
  @include rwd.pad-up {
    width: 53px;
    height: 53px;
  }
}

// 手機版折疊選單 - button
.navbar-toggler {
  width: 54px;
  height: 38px;
}
// 手機版折疊選單 - 選單內容
.navbar-collapse {
  border-bottom: 2px solid var(--bs-primary);
  background-color: var(--bs-body-bg);
  position: absolute;
  width: 100%;
  z-index: 5;
}

// 搜尋功能
.search {
  width: 207px;
  height: 39px;
  @include rwd.pad-up {
    width: 335px;
    height: 55px;
  }
}
.search-input {
  padding: 0 10px;
  @include rwd.pad-up {
    padding: 0 22px;
  }
}
.search-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 39px;

  @include rwd.pad-up {
    width: 55px;
  }
}
</style>
