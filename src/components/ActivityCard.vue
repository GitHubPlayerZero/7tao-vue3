<template>
  <!-- 大標題 -->
  <div class="card-title">19 MAY 2023</div>

  <!-- 活動圖片 -->
  <img src="@/assets/images/event/01.jpg" alt="邪典電影派對——房間" class="card-image" />

  <!-- 小標題 -->
  <h3 class="card-subtitle font-noto-serif-tc">邪典電影派對——房間</h3>

  <!-- 活動內容 -->
  <p class="card-content font-noto-sans-tc">
    你有聽說過「大災難家」裡面的主角 Tommy Wiseau
    製作的「史上最爛的電影」——房間嗎？在美國甚至演變成一種邪教、一種派對的形式，在電影播放的時候對著螢幕丟湯匙都成了必備活動。這個習俗源於電影中多次出現毫無解釋的湯匙照片，讓觀眾哭笑不得。除此之外，粉絲還會模仿台詞、製造互動，甚至在關鍵場景時集體歡呼或吐槽。儘管《房間》的劇情漏洞百出，表演拙劣，但它的荒謬恰恰成為其吸引力的一部分，甚至每年吸引成千上萬人參加特殊放映場次。對某些人來說，它不僅僅是一部電影，更是一場文化現象。如果你想體驗一場充滿荒唐和歡樂的電影之夜，《房間》絕對值得一看！
  </p>

  <!-- 結尾資訊 -->
  <div class="card-footer">
    <!-- 分類 -->
    <a href="#" class="hover-underline d-flex align-items-center" @click.prevent>
      <i class="icofont-star-alt-1 fs-24 me-1"></i>
      <span class="hover-effect">社群活動</span>
    </a>
    <!-- 開賣 -->
    <a
      href="#"
      class="hover-show-before d-flex align-items-center font-noto-sans-tc"
      @click.prevent
    >
      <span class="hover-effect me-1">開賣中</span>
      <i class="icofont-rounded-double-right"></i>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  components: {},
};
</script>

<style lang="scss" scoped>
@use "bootstrap/scss/mixins/breakpoints";
@use "@/assets/scss/base/variables";
@use "@/assets/scss/mixins/webkit-clamp";
@use "@/assets/scss/mixins/shape";

.card-title {
  font-size: 32px;
  line-height: 1.155;
  border-bottom: 3px solid var(--bs-primary);
  padding-bottom: 8px;
  margin-bottom: 16px;

  // Pad 以上
  @include breakpoints.media-breakpoint-up(variables.$pad, variables.$grid-breakpoints) {
    font-size: 48px;
    margin-bottom: 12px;
    margin-bottom: 12px;
  }
}

.card-image {
  object-fit: cover;
  width: 100%;
  height: 210px;
  margin-bottom: 8px;

  // Pad 以上
  @include breakpoints.media-breakpoint-up(variables.$pad, variables.$grid-breakpoints) {
    height: 255px;
    margin-bottom: 12px;
  }
}

.card-subtitle {
  font-size: 18px;
  line-height: 1.437;
  font-weight: bold;
  margin-bottom: 8px;

  // Pad 以上
  @include breakpoints.media-breakpoint-up(variables.$pad, variables.$grid-breakpoints) {
    font-size: 24px;
    margin-bottom: 12px;
  }
}

.card-content {
  text-align: justify;
  margin-bottom: 16px;

  // 內容省略
  @include webkit-clamp.webkit-clamp(3);
}

.card-footer {
  font-weight: bold;
  line-height: 1;

  display: flex;
  justify-content: space-between;
  height: 39px;

  border-style: solid;
  border-color: var(--bs-primary);
  border-width: 2px 0;

  // Pad 以上
  @include breakpoints.media-breakpoint-up(variables.$pad, variables.$grid-breakpoints) {
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
