<template>
  <!-- 重點活動連結 -->
  <div class="row row-cols-3 row-cols-xl-6 row-gap-2 row-gap-md-6 mb-8 mb-md-12">
    <div v-for="link in links" :key="link.title">
      <a :href="getTagId(link.title)" class="key-link" @click.prevent>
        <img :src="getImageUrl(link.img)" :alt="link.title" class="key-link-img" />
        <span>{{ link.title }}</span>
      </a>
    </div>
    <!-- 探索更多 -->
    <div>
      <a href="#" class="key-link" @click.prevent>
        <span class="fs-24 fs-md-48 lh-1d333 lh-md-1d25">探索<br />更多</span>
      </a>
    </div>
  </div>
</template>

<script>
import { ImageUtils } from "@/utils";
import { TagApi } from "@/api";

export default {
  props: ["tags"],

  data() {
    console.log(`## [KeyLinkArea - data]`);
    // console.log(`[data] tags ==>`, this.tags);

    return {
      // 連結按鈕
      links: [
        { title: "演出", img: "cate01.svg" },
        { title: "聯誼", img: "cate02.svg" },
        { title: "展覽", img: "cate03.svg" },
        { title: "美食", img: "cate04.svg" },
        { title: "戶外", img: "cate05.svg" },
      ],
    };
  },
  // data end

  methods: {
    // 取得圖片完整 URL
    getImageUrl: (relativePathName) => ImageUtils.getBaseUrl(relativePathName),

    // 以 tag 名稱取得 tag ID
    getTagId(tagName) {
      let tag = TagApi.searchByName(this.tags, tagName);
      if (tag) {
        return tag.id;
      } else {
        return "";
      }
    },
  },
  // methods end

  // computed: {},
  // watch: {},
  // components: {},

  // TODO debug 測試
  beforeCreate() {
    console.log(`## [KeyLinkArea - beforeCreate]`);
  },
  created() {
    console.log(`## [KeyLinkArea - created]`);
  },
  beforeMount() {
    console.log(`## [KeyLinkArea - beforeMount]`);
  },
  mounted() {
    console.log(`## [KeyLinkArea - mounted]`);
    // console.log(`[KeyLinkArea - mounted] this.tag ==>`, this.tag);
  },
  // mounted end
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
