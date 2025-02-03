<template>
  <!-- 重點活動連結 -->
  <div class="row row-cols-3 row-cols-xl-6 row-gap-2 row-gap-md-6 mb-8 mb-md-12">
    <div>
      <a href="#" class="key-link" @click.prevent>
        <img src="@/assets/images/cate01.svg" alt="演出" class="key-link-img" />
        <span>演出</span>
      </a>
    </div>
    <div>
      <a href="#" class="key-link" @click.prevent>
        <img src="@/assets/images/cate02.svg" alt="演出" class="key-link-img" />
        <span>聯誼</span>
      </a>
    </div>
    <div>
      <a href="#" class="key-link" @click.prevent>
        <img src="@/assets/images/cate03.svg" alt="演出" class="key-link-img" />
        <span>展覽</span>
      </a>
    </div>
    <div>
      <a href="#" class="key-link" @click.prevent>
        <img src="@/assets/images/cate04.svg" alt="演出" class="key-link-img" />
        <span>美食</span>
      </a>
    </div>
    <div>
      <a href="#" class="key-link" @click.prevent>
        <img src="@/assets/images/cate05.svg" alt="演出" class="key-link-img" />
        <span>戶外</span>
      </a>
    </div>
    <div>
      <a href="#" class="key-link" @click.prevent>
        <span class="fs-24 fs-md-48 lh-1d333 lh-md-1d25">探索<br />更多</span>
      </a>
    </div>
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
