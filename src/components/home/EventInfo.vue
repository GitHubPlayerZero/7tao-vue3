<template>
  <!-- 近期活動 -->
  <article class="mb-8 mb-md-15">
    <h2 class="title mb-6 mb-md-8">
      <span class="title-english">RECENT</span>
      <span class="title-chinese">近期活動</span>
    </h2>

    <ul class="row row-gap-6 row-gap-md-12">
      <li class="col-md-6 col-xl-4" v-for="event in recentEvents" :key="event.id">
        <EventCard :event="event" />
      </li>
    </ul>
  </article>

  <!-- 線上活動 -->
  <article v-if="onlineEvent" class="mb-8 mb-md-15">
    <h2 class="title mb-6 mb-md-8">
      <span class="title-english">ONLINE</span>
      <span class="title-chinese">線上活動</span>
    </h2>

    <div class="row">
      <!-- 圖片 -->
      <div class="col-12 col-xl-7 mb-3 mb-xl-0">
        <div :style="{ backgroundImage: `url(${onlineEvent.img})` }" class="online-img"></div>
      </div>

      <div class="col">
        <!-- 標題 -->
        <h3 class="text-black fw-bold fs-18 fs-md-32 lh-1d444 lh-md-1d438 mb-2 mb-md-4">
          {{ onlineEvent.title }}
        </h3>

        <!-- 標籤 -->
        <ul class="d-flex flex-wrap gap-2 mb-3 mb-md-8">
          <li v-for="tag in onlineEvent.subTags" :key="tag">
            <span class="tag">{{ tag.name }}</span>
          </li>
        </ul>

        <!-- 說明 -->
        <p class="font-noto-sans-tc text-justify white-space-pre-wrap lh-xl-1d438 mb-3 mb-md-8">
          {{ onlineEvent.desc }}
        </p>

        <!-- 按鈕 -->
        <router-link
          :to="{ path: `/event/${onlineEvent.id}` }"
          class="btn btn-primary d-flex justify-content-center align-items-center w-100 py-4 py-xl-2 fs-md-20 lh-md-1d45"
        >
          <span class="me-1">查看活動詳情</span>
          <i class="icofont-rounded-double-right"></i>
        </router-link>
      </div>
      <!-- col end -->
    </div>
    <!-- row end -->
  </article>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { TagModel } from "@/service/tag";
// eslint-disable-next-line no-unused-vars
import { EventTagRecord, EventTagModel } from "@/service/event";
import EventCard from "@/components/global/EventCard.vue";

export default {
  inject: ["tagModel", "eventTagModel"],

  /**
   * @returns {{myTagModel: TagModel, myEventTagModel: EventTagModel, recentEvents: EventTagRecord[], onlineEvent: EventTagRecord}}
   */
  data() {
    return {
      myTagModel: this.tagModel,
      myEventTagModel: this.eventTagModel,
      recentEvents: null, // 近期活動資料集
      onlineEvent: null, // 線上活動
    };
  },

  methods: {},

  components: {
    EventCard,
  },

  created() {
    const recentEventLimit = 6; // "近期活動" 的數量上限
    const onlineTagId = this.myTagModel.getIdByName("線上活動"); // "線上活動" 的 tag ID

    const recentEvents = []; // 近期活動
    let onlineEvent; // 線上活動

    for (const item of this.myEventTagModel.datas) {
      // 線上活動
      if (item.mainTag.id === onlineTagId) {
        // 若線上活動尚未有資料則寫入
        if (!onlineEvent) {
          onlineEvent = item;
        }
      }
      // 其它活動
      else {
        // 若近期活動尚未額滿則寫入
        if (recentEvents.length < recentEventLimit) {
          recentEvents.push(item);
        }
      }

      // 當資料找齊即中斷迴圈
      if (onlineEvent && recentEvents.length >= recentEventLimit) {
        break;
      }
    }

    this.recentEvents = recentEvents;
    this.onlineEvent = onlineEvent;
    // TODO delete
    // console.log(`onlineEvent ==>`, this.onlineEvent);
    // console.log(`recentEvents ==>`, this.recentEvents);
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/rwd";

// 線上活動 - 圖片
.online-img {
  height: 158px;
  width: 100%;
  background-position-y: 31.3%;
  background-size: cover;

  @include rwd.pad-up {
    height: 310px;
  }

  @include rwd.desktop-up {
    height: 100%;
    background-position-y: 32.5%;
  }
}
</style>
