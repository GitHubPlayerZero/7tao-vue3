<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <article class="mb-8 mb-md-15">
    <!-- 僅作為標題結構，但不需顯示在畫面上 -->
    <h2 class="visually-hidden">活動集錦・ALBUMS</h2>

    <!-- 跑馬燈 -->
    <ScrollingText />

    <!-- Albums -->
    <div class="container my-12 my-md-15">
      <ul class="row justify-content-center justify-content-md-start row-gap-11">
        <li v-for="(album, index) in albums" :key="album.id" class="col-10 col-md-6 col-xl-3">
          <AlbumCard :album="album" :index="index" />
        </li>
      </ul>
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

// TODO 做成輪播
export default {
  /**
   * @typedef {Object} AlbumsData
   * @property {AlbumRecord[]} albums 相簿資料。
   */
  /** @returns {AlbumsData} */
  data() {
    return {
      albums: [], // 相簿資料
    };
  },

  created() {
    // 取得相簿資料
    useAlbums().then(({ albums }) => {
      this.albums = albums;
    });
  },

  components: {
    ScrollingText,
    AlbumCard,
  },
};
</script>
