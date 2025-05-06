<template>
  <router-link
    v-for="event in banners"
    :key="event.id"
    class="banner-slide position-relative mb-8 mb-md-12"
    :style="{ backgroundImage: `url(${event.img})` }"
    :to="{ path: `/events/${event.id}` }"
  >
    <div class="banner-slide-date">{{ event.abbrDate }}</div>
    <div class="position-absolute bottom-0 w-100 mb-6">
      <p class="banner-slide-title">{{ event.title }}</p>
      <p class="banner-slide-desc d-none d-md-block">{{ event.bannerDesc }}</p>
    </div>
  </router-link>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { EventService, EventRecord, EventModel } from "@/services/data/event";

// TODO 做成 swiper
export default {
  inject: ["loading"],

  /**
   * @returns {{banners: EventRecord[]}}
   */
  data() {
    return {
      banners: [],
    };
  },

  methods: {},

  created() {
    console.log(`## [BannerSlide - created]`);

    console.log(`[Banner] open loading...`);
    this.loading.open();

    // 取得 banner 資料
    EventService.fetchBanners()
      .then((res) => {
        this.banners = new EventModel(res).datas;
        console.log(`banners ==>`, this.banners);
      })
      .finally(() => {
        console.log(`[Banner] close loading...`);
        this.loading.close();
      });
  },

  // TODO debug 測試
  beforeCreate() {
    console.log(`## [BannerSlide - beforeCreate]`);
  },
  beforeMount() {
    console.log(`## [BannerSlide - beforeMount]`);
  },
  mounted() {
    console.log(`## [BannerSlide - mounted]`);
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
