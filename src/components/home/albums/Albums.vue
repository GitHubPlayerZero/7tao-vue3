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
        <li v-for="(i, index) in 4" :key="i" class="col-10 col-md-6 col-xl-3">
          <AlbumCard :index="index" :album="testData" />
        </li>
      </ul>
    </div>

    <!-- 跑馬燈 -->
    <ScrollingText :isReverse="true" />
  </article>
</template>

<script>
import ScrollingText from "@/components/home/albums/ScrollingText.vue";
import AlbumCard from "@/components/home/albums/AlbumCard.vue";

// TODO 做成輪播
export default {
  data() {
    return {
      // TODO 測試資料，之後應改為打 API 取回資料
      testData: {
        label: "社群活動",
        title: "無聲派對-閉閉嘴dancing",
        img: "https://i.imgur.com/h8x1kMD.jpeg",
      },
    };
  },
  methods: {},
  computed: {},
  watch: {},
  components: {
    ScrollingText,
    AlbumCard,
  },
};
</script>
