<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="position-sticky top-0 z-10 bg-body">
    <header class="py-3 py-md-6 border-2 border-md-3 border-bottom border-primary">
      <div class="container">
        <nav class="navbar">
          <div class="d-flex align-items-center">
            <!-- 主標題 -->
            <h1 class="me-25px me-md-12">
              <RouterLink to="/" class="d-flex align-items-center">
                <img :src="`./images/logo.png`" alt="7tao" class="logo" />
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

          <!-- 有登入則顯示使用者折疊選單按鈕 -->
          <button
            v-if="user.id"
            type="button"
            class="user-btn btn"
            data-bs-toggle="collapse"
            data-bs-target="#collapseMenu"
            aria-controls="collapseMenu"
            aria-expanded="false"
            aria-label="展開使用者選單"
          >
            <i class="icofont-ui-user"></i>
          </button>

          <!-- 否則顯示一般選單 -->
          <template v-else>
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
          </template>
        </nav>
      </div>
      <!-- container end -->
    </header>

    <!-- 折疊選單：手機一般選單 及 使用者選單 共用 -->
    <!-- 使用者選單 有使用 left 使其靠右，因此需要使用 container 限縮範圍 -->
    <div class="position-relative" :class="{ container: user.id }">
      <!-- 若為 使用者選單 則需要再加入額外樣式 -->
      <div
        class="collapse navbar-collapse"
        :class="{ 'navbar-collapse-user': user.id }"
        id="collapseMenu"
        @click.stop
      >
        <!-- 手機一般選單 為佔滿整個寬度，因此需要 container 限縮內容 -->
        <!-- 使用者選單 本身會限縮寬度，因此不需要 container -->
        <div :class="{ container: !user.id }">
          <CollapseMenu />
        </div>
      </div>
    </div>
    <!-- 折疊選單 end -->
  </div>
</template>

<script setup>
import { onMounted, provide } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores";
import CollapseMenu from "./CollapseMenu.vue";

// Store - 使用者資料
const user = useUserStore();

// 顯示折疊選單的 class 名稱
const classShow = "show";

// 元素 - 折疊選單
let elMenu;

onMounted(() => {
  elMenu = document.querySelector("#collapseMenu");

  // 以下動作均會觸發關閉折疊選單
  ["click", "keydown", "scroll"].forEach((eventItem) => {
    document.addEventListener(eventItem, closeMenu);
  });

  // 改變視窗大小時關閉折疊選單
  window.addEventListener("resize", closeMenu);
});

/**
 * 關閉折疊選單。
 */
function closeMenu() {
  const menuClasses = elMenu.classList;
  if (menuClasses.contains(classShow)) {
    menuClasses.remove(classShow);
  }
}

// 提供給子元件使用
provide("closeMenu", closeMenu);
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

.navbar-collapse-user {
  width: max-content;
  right: 20px;
  top: -5px;
  border: 2px solid black;
  padding: 0px 24px;

  @include rwd.pad-up {
    top: -10px;
  }
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

// 使用者登入後按鈕
.user-btn {
  padding: 6px 12px;
  border: 2px solid var(--bs-primary);
  border-radius: 50%;

  &:hover {
    background-color: var(--bs-primary);

    i {
      color: var(--bs-body-bg);
    }
  }

  @include rwd.pad-up {
    font-size: 24px;
  }
}
</style>
