<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <article class="mb-8 mb-md-15">
    <!-- 僅作為標題結構，但不需顯示在畫面上 -->
    <h2 class="visually-hidden">活動集錦・ALBUMS</h2>

    <!-- 跑馬燈 -->
    <ScrollingText />

    <!-- Albums 輪播 -->
    <div class="container my-12 my-md-15">
      <Swiper
        :modules="swiperModules"
        :navigation="true"
        :spaceBetween="24"
        :slidesPerView="slidesPerView"
        :loop="loop"
        :autoplay="{
          delay: 3000,
        }"
      >
        <SwiperSlide v-for="(album, index) in albums" :key="album.id">
          <AlbumCard :album="album" :index="index" />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 跑馬燈 -->
    <ScrollingText :isReverse="true" />
  </article>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { AlbumRecord } from "@/services/data/album";
import { useAlbums } from "@/composables/data/useAlbums";
import ScrollingText from "@/components/home/albums/ScrollingText.vue";
import AlbumCard from "@/components/home/albums/AlbumCard.vue";

/* Swiper 相關 */
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import required modules
import { Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default {
  /**
   * @typedef {object} AlbumsData
   * @property {AlbumRecord[]} albums 相簿資料
   * @property {Array} swiperModules Swiper 模組
   * @property {number} slidesPerView 每次顯示的幻燈片數量
   */

  /** @returns { AlbumsData } */
  data() {
    return {
      albums: [], // 相簿資料
      swiperModules: [Navigation, Autoplay], // Swiper 模組
      slidesPerView: 1, // 每次顯示的幻燈片數量
    };
  },

  async created() {
    // 取得相簿資料
    const { albums } = await useAlbums();
    this.albums = albums;

    // 初始化 Swiper 設定
    this.updateSwiperByWidth();
  },

  mounted() {
    // 監聽螢幕寬度變化，動態調整 Swiper 設定
    window.addEventListener("resize", this.updateSwiperByWidth);
  },

  beforeUnmount() {
    // 清除監聽器
    window.removeEventListener("resize", this.updateSwiperByWidth);
  },

  methods: {
    /**
     * 根據螢幕寬度設定 Swiper。
     */
    updateSwiperByWidth() {
      // 手機
      if (window.matchMedia("(max-width: 768px)").matches) {
        this.slidesPerView = 1;
      }
      // 平板
      else if (window.matchMedia("(max-width: 1200px)").matches) {
        this.slidesPerView = 2;
      }
      // 桌機
      else {
        this.slidesPerView = 4;
      }
    },
  },

  computed: {
    /**
     * 相簿輪播的循環播放屬性。
     * @returns {boolean} 是否啟用循環播放。
     */
    loop() {
      // 相簿數量 必須大於 每次顯示的幻燈片數量 才能啟用循環播放
      return this.albums.length > this.slidesPerView;
    },
  },

  components: {
    ScrollingText,
    AlbumCard,
    Swiper,
    SwiperSlide,
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/rwd";

// 覆寫 Swiper 的樣式
.swiper {
  /*
   由於卡片因為旋轉而呈現不規則，超出的部份會因為 Swiper 特性而變成看不見。
   因此這邊需要額外設定 padding 將內容推擠至可視區。
  */
  padding-top: 25px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;

  // 手機版的卡片寬度非佔滿 100%，需要再另外限縮手機版的寬度。
  @include rwd.pad-down {
    width: 89%;
  }
}

// 覆寫 Swiper 的 slide 樣式
.swiper-slide {
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
