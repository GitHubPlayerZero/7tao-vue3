<template>
  <!-- 活動日期 -->
  <div class="event-date">{{ event.abbrDate }}</div>

  <!-- 活動圖片 -->
  <img :src="event.img" :alt="event.title" class="event-image" />

  <!-- 活動標題 -->
  <h3 class="event-title font-noto-serif-tc">{{ event.title }}</h3>

  <!-- 活動內容 -->
  <p class="event-desc font-noto-sans-tc">{{ event.desc }}</p>

  <!-- 結尾資訊 -->
  <div class="event-footer">
    <!-- 主分類標籤 -->
    <a href="#" :class="eventTagClasses" @click.prevent="clickEventTag(event.mainTag.id)">
      <i class="icofont-star-alt-1 fs-24 me-1"></i>
      <span class="hover-effect">{{ event.mainTag.name }}</span>
    </a>
    <!-- 開賣 -->
    <router-link
      :to="{ path: `/event/${event.id}` }"
      class="hover-show-before d-flex align-items-center font-noto-sans-tc"
    >
      <span class="hover-effect me-1">{{ event.isOnSale ? "開賣中" : "檢視活動" }}</span>
      <i class="icofont-rounded-double-right"></i>
    </router-link>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { EventTagRecord } from "@/service/event";

defineProps({
  event: EventTagRecord,
});

/**
 * 處理活動卡標籤動作。
 */
// 標籤點擊方法
let clickEventTag = inject("clickEventTag", null);
// 標籤樣式 class
const eventTagClasses = ["d-flex", "align-items-center"];

// 有標籤點擊方法
if (clickEventTag) {
  // 加上其它 hover 效果
  eventTagClasses.push("hover-underline");
}
// 否則
else {
  // 使 hover 失效
  eventTagClasses.push("cursor-auto");
  // 使點擊無作用
  clickEventTag = () => {};
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/rwd";
@use "@/assets/scss/mixins/webkit-clamp";
@use "@/assets/scss/mixins/shape";

.event-date {
  font-size: 32px;
  line-height: 1.155;
  border-bottom: 3px solid var(--bs-primary);
  padding-bottom: 8px;
  margin-bottom: 16px;

  @include rwd.pad-up {
    font-size: 48px;
    margin-bottom: 12px;
  }
}

.event-image {
  object-fit: cover;
  width: 100%;
  height: 210px;
  margin-bottom: 8px;

  @include rwd.pad-up {
    height: 255px;
    margin-bottom: 12px;
  }
}

.event-title {
  font-size: 18px;
  line-height: 1.437;
  font-weight: bold;
  margin-bottom: 8px;

  @include rwd.pad-up {
    font-size: 24px;
    margin-bottom: 12px;
  }
}

.event-desc {
  text-align: justify;
  margin-bottom: 16px;

  // 內容省略
  @include webkit-clamp.webkit-clamp(3);
}

.event-footer {
  font-weight: bold;

  display: flex;
  justify-content: space-between;
  height: 39px;

  border-style: solid;
  border-color: var(--bs-primary);
  border-width: 2px 0;

  @include rwd.pad-up {
    height: 48px;
  }
}

// 分類 hover 樣式
.hover-underline:hover .hover-effect {
  text-decoration: underline;
}

// 開賣中 hover 樣式
.hover-show-before {
  &::before {
    content: "";
    @include shape.circle(29px, var(--bs-secondary));
    position: relative;
    left: 19px;
    z-index: -1;
    display: none;
  }

  &:hover::before {
    display: inline-block;
  }
}
</style>
