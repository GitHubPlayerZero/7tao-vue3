<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Swiper
    :modules="swiperModules"
    :navigation="true"
    :pagination="{ clickable: true, dynamicBullets: true }"
    :slidesPerView="1"
    :loop="banners.length > 1"
    :autoplay="{
      delay: 3000,
    }"
    class="mb-8 mb-md-12"
  >
    <SwiperSlide v-for="event in banners" :key="event.id">
      <router-link
        class="banner-slide position-relative"
        :style="{ backgroundImage: `url(${event.img})` }"
        :to="{ path: `/events/${event.id}` }"
      >
        <div class="banner-slide-date">{{ event.abbrDate }}</div>
        <div class="position-absolute bottom-0 w-100 mb-6">
          <p class="banner-slide-title">{{ event.title }}</p>
          <p class="banner-slide-desc d-none d-md-block">{{ event.bannerDesc }}</p>
        </div>
      </router-link>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { mapActions } from "pinia";
import { useLoadingStore } from "@/stores";
// eslint-disable-next-line no-unused-vars
import { EventService, EventRecord, EventModel } from "@/services/data/event";

/* Swiper 相關 */
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

/**
 * @typedef {object} BannerData
 * @property {Array} swiperModules Swiper 模組。
 * @property {EventRecord[]} banners Banner 活動資料。
 */
export default {
  /**
   * @returns { BannerData }
   */
  data() {
    return {
      swiperModules: [Navigation, Pagination, Autoplay], // Swiper 模組
      banners: [],
    };
  },

  created() {
    this.openLoading();

    // 取得 banner 資料
    EventService.fetchBanners()
      .then((res) => {
        this.banners = new EventModel(res).datas;
      })
      .finally(() => {
        this.closeLoading();
      });
  },

  methods: {
    /** loading 功能 */
    ...mapActions(useLoadingStore, {
      openLoading: "open",
      closeLoading: "close",
    }),
  },

  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/rwd";
@use "@/assets/scss/mixins/font";

.banner-slide {
  display: block;
  height: 350px;
  background-size: cover;
  background-position: center;
  color: white;
  padding-top: 16px;

  // active 不做縮放效果
  &:active {
    transform: scale(1);
  }

  @include rwd.pad-up {
    height: 518px;
    padding-top: 48px;
  }
}

.banner-slide-date {
  width: 113px;
  font-size: 32px;
  line-height: 1.155;
  margin-left: 40px;

  @include rwd.pad-up {
    width: auto;
    font-size: 60px;
    margin-left: 48px;
  }
}

.banner-slide-title {
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
  letter-spacing: 0.05em;

  @include rwd.pad-up {
    font-size: 24px;
    margin-bottom: 16px;
  }
}

.banner-slide-desc {
  @include font.noto-sans-tc;
  max-width: 832px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
