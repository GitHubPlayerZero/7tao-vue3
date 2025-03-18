<template>
  <!-- 活動日期 -->
  <div class="event-date">{{ DateService.formatAsDateAbbrMonthYear(event.date) }}</div>

  <!-- 活動圖片 -->
  <img :src="event.img" :alt="event.title" class="event-image" />

  <!-- 活動標題 -->
  <h3 class="event-title font-noto-serif-tc">{{ event.title }}</h3>

  <!-- 活動內容 -->
  <p class="event-desc font-noto-sans-tc">{{ event.desc }}</p>

  <!-- 結尾資訊 -->
  <div class="event-footer">
    <!-- 主分類 -->
    <a href="#" class="hover-underline d-flex align-items-center" @click.prevent>
      <i class="icofont-star-alt-1 fs-24 me-1"></i>
      <span class="hover-effect">{{ tagIdMap[EventApi.getMainTagId(event)] }}</span>
    </a>
    <!-- 開賣 -->
    <a
      href="#"
      class="hover-show-before d-flex align-items-center font-noto-sans-tc"
      @click.prevent
    >
      <span class="hover-effect me-1">{{ event.isOnSale ? "開賣中" : "檢視活動" }}</span>
      <i class="icofont-rounded-double-right"></i>
    </a>
  </div>
</template>

<script setup>
import { EventApi } from "@/api";
import { DateService } from "@/service";

const { event, tagIdMap } = defineProps(["event", "tagIdMap"]);
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
