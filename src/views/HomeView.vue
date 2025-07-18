<template>
  <div class="container mt-4 mt-md-8">
    <!-- Banner -->
    <Banner />

    <!-- 重點連結 -->
    <div class="row row-cols-3 row-cols-xl-6 row-gap-2 row-gap-md-6 mb-8 mb-md-12">
      <!-- 分類標籤 -->
      <div v-for="link in links" :key="link.title">
        <a href="#" class="key-link" @click.prevent="goToEventList(getTagId(link.title))">
          <img :src="getImageUrl(link.img)" :alt="link.title" class="key-link-img" />
          <span>{{ link.title }}</span>
        </a>
      </div>
      <!-- 探索更多 -->
      <div>
        <a href="#" class="key-link" @click.prevent="goToEventList">
          <span class="fs-24 fs-md-48 lh-1d333 lh-md-1d25">探索<br />更多</span>
        </a>
      </div>
    </div>

    <!-- 活動資訊 -->
    <EventInfo v-if="tagModel && eventTagModel" />
  </div>

  <!-- 活動集錦 -->
  <Albums />

  <!-- 關注我們 -->
  <FollowUs />

  <!-- slogan -->
  <div class="py-12 py-md-15 border-top border-primary border-3">
    <div class="container">
      <p class="fs-18 fs-md-32 mb-3 mb-md-4 fw-bold text-center">
        此刻打盹，你將做夢；此刻學習，你將圓夢
      </p>
      <p class="fs-14 fs-md-18 fw-bold text-center">——我也不知道誰說的</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { mapActions } from "pinia";
import { useLoadingStore } from "@/stores";
import { ImageUtils } from "@/helpers";
// eslint-disable-next-line no-unused-vars
import { TagModel } from "@/services/data/tag";
// eslint-disable-next-line no-unused-vars
import { EventTagModel } from "@/services/data/event";
import { EventListHistState } from "@/services/features";
import { useEventTag } from "@/composables";

// components
import Banner from "@/components/home/Banner.vue";
import EventInfo from "@/components/home/EventInfo.vue";
import Albums from "@/components/home/albums/Albums.vue";
import FollowUs from "@/components/home/FollowUs.vue";

/**
 * @typedef {object} HomeViewData
 * @property {TagModel} tagModel 標籤資料模型。
 * @property {EventTagModel} eventTagModel 活動資料模型。
 * @property {Array<{title: string, img: string}>} links 主要連結功能按鈕。
 */
export default {
  /**
   * @return { HomeViewData }
   */
  data() {
    return {
      tagModel: null, // 標籤資料模型
      eventTagModel: null, // 活動資料模型

      // 主要連結功能按鈕
      links: [
        { title: "演出", img: "cate01.svg" },
        { title: "聯誼", img: "cate02.svg" },
        { title: "展覽", img: "cate03.svg" },
        { title: "美食", img: "cate04.svg" },
        { title: "戶外", img: "cate05.svg" },
      ],
    };
  },

  created() {
    this.openLoading();

    // 取得標籤、活動
    useEventTag()
      .then((res) => {
        this.tagModel = res.tagModel;
        this.eventTagModel = res.eventTagModel;
      })
      .finally(() => {
        this.closeLoading();
      });
  },

  provide() {
    return {
      tagModel: computed(() => this.tagModel),
      eventTagModel: computed(() => this.eventTagModel),
      clickEventTag: this.goToEventList,
    };
  },

  methods: {
    /** loading 功能 */
    ...mapActions(useLoadingStore, {
      openLoading: "open",
      closeLoading: "close",
    }),

    /**
     * 取得圖片完整 URL。
     * @param {string} fileName 檔案名稱。
     * @return {string} 圖片 URL。
     */
    getImageUrl: (fileName) => ImageUtils.getImagePath(fileName),

    /**
     * 以 tag 名稱取得 tag ID。
     * @param {string} tagName tag 名稱。
     * @return {number} tag ID。
     */
    getTagId(tagName) {
      return this.tagModel.getIdByName(tagName);
    },

    /**
     * 轉到活動列頁面，會以 tagId 作為頁面參數。
     * @param {string} tagId tag ID。
     */
    goToEventList(tagId) {
      this.$router.push({
        path: "/events",
        state: EventListHistState.createTagData(tagId),
      });
    },
  },
  // methods end

  components: {
    Banner,
    EventInfo,
    Albums,
    FollowUs,
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/rwd";

.key-link {
  height: 112px;
  font-weight: 700;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @include rwd.pad-up {
    height: 196px;
    font-size: 24px;
    line-height: 1.2;
  }

  &:hover {
    color: var(--bs-secondary);
    background-color: var(--bs-primary);
    font-size: 24px;
    transition: font-size 100ms linear;

    @include rwd.pad-up {
      font-size: 48px;
    }

    .key-link-img {
      display: none;
    }
  }
}

// 圖示
.key-link-img {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;

  @include rwd.pad-up {
    width: 80px;
    height: 80px;
    margin-bottom: 12px;
  }
}
</style>
