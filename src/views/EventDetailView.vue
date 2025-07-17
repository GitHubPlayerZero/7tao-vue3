<template>
  <div class="container mt-4 mt-md-30px mb-12 mb-md-15" v-if="event.id">
    <!-- Banner -->
    <section class="row row-gap-2 mb-6">
      <!-- 圖片 -->
      <div class="col-xl-10">
        <div class="p-3 p-xl-6 border border-2 border-md-3 border-primary">
          <img
            :src="event.img"
            :alt="event.title"
            class="ratio-1d817 ratio-xl-1d869 w-100 object-fit-cover"
          />
        </div>
      </div>

      <!-- 日期時間 -->
      <div class="col-xl-2">
        <h2 class="row row-gap-6 flex-xl-column lh-1 h-100">
          <!-- 年 -->
          <div class="col-4 col-md-5 col-xl-12">
            <div
              class="fs-24 fs-md-48 border border-2 border-md-3 border-primary h-78px h-md-119px text-center align-content-center"
            >
              {{ day.year }}
            </div>
          </div>

          <!-- 月日、時間 -->
          <div class="col-8 col-md-7 col-xl-12 flex-grow-1 fs-16">
            <div
              class="px-6 px-md-15 px-xl-0 py-xl-12 border border-2 border-md-3 border-primary d-flex flex-xl-column justify-content-between align-items-center text-center h-100"
            >
              <!-- 月日 -->
              <div class="fs-22 fs-md-32 fs-xl-48 lh-1d136 lh-md-1d146">
                {{ day.month }}<br />{{ day.date }}
              </div>
              <div class="slash"></div>
              <!-- 時間 -->
              <div class="fs-md-24 fs-xl-32 lh-1d125 lh-md-1d155">
                {{ event.sTime }}<br />｜<br />{{ event.eTime }}
              </div>
            </div>
          </div>
        </h2>
      </div>
    </section>
    <!-- Banner end -->

    <!-- 內容說明 -->
    <article>
      <!-- 標題 -->
      <h2 class="mb-2 mb-md-4 fs-32 fs-md-60 lh-1d438 lh-md-1d433 fw-bold letter-spacing-5">
        {{ event.title }}
      </h2>
      <p class="mb-6 fs-md-22 lh-md-1d45 font-noto-sans-tc">
        {{ event.subTitle }}
      </p>

      <!-- 標籤 -->
      <ul class="mb-12 d-none d-md-flex flex-wrap gap-2">
        <li class="tag" v-for="tag in event.tagDatas" :key="tag.id">{{ tag.name }}</li>
      </ul>

      <!-- 說明 -->
      <div
        class="p-4 p-md-8 mb-6 mb-md-12 border border-2 border-md-3 border-primary font-noto-sans-tc d-flex flex-column row-gap-4 text-justify"
      >
        <p v-if="event.opening">{{ event.opening }}</p>
        <p v-for="(p, index) in getDescParagraphs(event.desc)" :key="index">{{ p }}</p>
      </div>
    </article>
    <!-- 內容說明 end -->

    <!-- 票券資訊 -->
    <TicketInfo v-if="event.id" :event="event" />
  </div>

  <!-- 沒有活動資料 -->
  <SimpleMsg :message="message" v-else />
</template>

<script>
// TODO 待檢查優化
import { mapActions } from "pinia";
import { useLoadingStore } from "@/stores";
import { DateUtils } from "@/helpers";
import { CommonService } from "@/services";
import { EventService, EventTagRecord } from "@/services/data/event";
import { TagModel, TagService } from "@/services/data/tag";
import TicketInfo from "@/components/eventDetail/TicketInfo.vue";
import SimpleMsg from "@/components/global/SimpleMsg.vue";

export default {
  /**
   * @returns {{event: EventTagRecord}}
   */
  data() {
    return {
      event: {}, // 活動資料
      message: "",
    };
  },

  methods: {
    /** loading 功能 */
    ...mapActions(useLoadingStore, {
      openLoading: "open",
      closeLoading: "close",
    }),

    /**
     * 取得活動說明段落。
     * @param {string} desc 完整活動說明。
     * @returns {string[]} 依據換行符號切開的各個段落。
     */
    getDescParagraphs(desc) {
      return CommonService.splitParagraphs(desc);
    },
  },

  computed: {
    /**
     * 日期。
     * @returns {{year: number, month: string, date: number}} 整理過的日期。
     */
    day() {
      if (!this.event.date) {
        return {};
      }

      const day = DateUtils.convertToDate(this.event.date);

      return {
        year: day.getFullYear(),
        month: DateUtils.getMonthAbbrByMonth(day.getMonth() + 1),
        date: day.getDate(),
      };
    },
  },
  // computed end

  components: {
    TicketInfo,
    SimpleMsg,
  },

  created() {
    this.openLoading();

    // 取得活動資訊
    Promise.all([TagService.fetchTags(), EventService.fetchEvent(this.$route.params.id)])
      .then((resList) => {
        const tagModel = new TagModel(resList[0]);
        this.event = new EventTagRecord(resList[1], tagModel);

        if (!this.event.id) {
          this.message = "查無活動資料！";
        }
      })
      .finally(() => {
        this.closeLoading();
      });
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/rwd";
@use "@/assets/scss/mixins/shape";

// 斜線
.slash {
  @include shape.slash(50px, 2px, 120);
  @include rwd.pad-up {
    width: 70px;
  }
  @include rwd.desktop-up {
    width: 100px;
  }
}
</style>
