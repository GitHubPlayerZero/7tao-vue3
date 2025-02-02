<template>
  <div
    v-for="item in banners"
    :key="item.id"
    class="banner-slide position-relative"
    :style="{ backgroundImage: `url(${getImageUrl(item.img)})` }"
  >
    <div class="banner-slide-day">{{ item.day }}</div>
    <div class="position-absolute bottom-0 w-100 mb-6">
      <p class="banner-slide-title">{{ item.title }}</p>
      <p class="banner-slide-text d-none d-md-block">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script>
import { SysConstants } from "@/assets/js";
import { PathProcesser } from "@/assets/js";

export default {
  data() {
    return {
      // TODO banner
      // 1. 動態取得資料
      // 2. 做成 swiper
      banners: [
        {
          id: 1,
          day: "19 MAY 2023",
          title: "隔牆有耳-沒有草東的派對",
          desc: `你各位聽團仔們！每次想跟朋友一起聽草東專場卻每一次都搶不到票？「草東沒有派對」永遠都是「草東沒有門票」！\n帶上啤酒、野餐墊，讓我們在Live House外面一起開場「沒有草東的派對」吧！`,
          img: "13.jpg",
        },
        // {
        //   id: 2,
        //   day: "19 MAY 2023",
        //   title: "隔牆有耳-沒有草東的派對",
        //   desc: `你各位聽團仔們！每次想跟朋友一起聽草東專場卻每一次都搶不到票？「草東沒有派對」永遠都是「草東沒有門票」！\n帶上啤酒、野餐墊，讓我們在Live House外面一起開場「沒有草東的派對」吧！`,
        //   img: "09.jpg",
        // },
      ],
    };
  },

  methods: {
    getImageUrl(imgPath) {
      return PathProcesser.append(SysConstants.imgEventUrl, imgPath);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/rwd";
@use "@/assets/scss/mixins/font";

.banner-slide {
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

.banner-slide-day {
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

.banner-slide-text {
  @include font.noto-sans-tc;
  max-width: 832px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
