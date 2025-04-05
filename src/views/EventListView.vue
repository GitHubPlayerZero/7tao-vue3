<template>
  <div class="container mt-4 mt-md-8">
    <h2 class="title mb-3 mb-md-8">
      <span class="title-english">EVENT</span>
      <span class="title-chinese">所有活動</span>
    </h2>

    <!-- 標籤 -->
    <ul class="d-flex flex-wrap gap-2 mb-8" v-if="tagModel">
      <li v-for="tag in tagModel.datas" :key="tag.id">
        <button
          type="button"
          :class="selectedTagIds.includes(tag.id) ? 'tag-btn-selected' : 'tag-btn'"
          @click="clickTagBtn(tag.id)"
        >
          {{ tag.name }}
        </button>
      </li>
    </ul>

    <!-- 活動卡片 -->
    <ul class="row row-gap-6 row-gap-md-12 mb-8 mb-md-15" v-if="pagination">
      <li class="col-md-6 col-xl-4" v-for="event in pagination.currentDatas" :key="event.id">
        <EventCard :event="event" />
      </li>
    </ul>

    <!-- 分頁 -->
    <nav aria-label="Page navigation" class="mb-12 mb-md-15">
      <ul class="pagination" v-if="pagination">
        <!-- 前一頁 -->
        <li class="page-item" :class="{ disabled: pagination.currentPage === 1 }">
          <a class="page-link fs-18" href="#" @click.prevent="pagination.goToPrevPage">
            <i class="icofont-arrow-left"></i>
          </a>
        </li>

        <!-- 各頁面 -->
        <template v-for="p in pagination.totalPages" :key="p">
          <li class="page-item" :class="{ active: pagination.currentPage === p }">
            <a class="page-link" href="#" @click.prevent="pagination.changePage(p)">{{ p }}</a>
          </li>
        </template>

        <!-- 下一頁 -->
        <li
          class="page-item"
          :class="{ disabled: pagination.currentPage === pagination.totalPages }"
        >
          <a class="page-link fs-18" href="#" @click.prevent="pagination.goToNextPage">
            <i class="icofont-arrow-right"></i>
          </a>
        </li>
      </ul>
    </nav>

    <p>selectedTags: {{ selectedTagIds }}</p>
  </div>
</template>

<script>
/** @import {Pagination} from "@/composables/usePagination.js" */

// eslint-disable-next-line no-unused-vars
import { TagModel } from "@/service/tag";
// eslint-disable-next-line no-unused-vars
import { EventTagModel, EventTagRecord } from "@/service/event";
// eslint-disable-next-line no-unused-vars
import { useEventTag, usePagination } from "@/composables";
import EventCard from "@/components/global/EventCard.vue";

// TODO 由活動資訊頁返回上一頁回到這裡時，會被帶回預設狀態，嘗試將 tag、頁碼存入 history.state，看看能否帶回最後的狀態
export default {
  /**
   * @returns {{selectedTagIds: number[], tagModel: TagModel, eventTagModel: EventTagModel, pagination: Pagination}}
   */
  data() {
    // console.log(`[EventListView data] $route ==>`, this.$route);

    return {
      selectedTagIds: [], // 選取的標籤
      tagModel: null, // 標籤資料模型
      eventTagModel: null, // 活動資料模型
      pagination: null, // 分頁工具
    };
  },

  methods: {
    /**
     * 按下 Tag 按鈕要處理的動作。
     * @param tagId {number} Tag ID。
     */
    clickTagBtn(tagId) {
      const index = this.selectedTagIds.indexOf(tagId);

      // Tag 已存在則刪除之
      if (index >= 0) {
        this.selectedTagIds.splice(index, 1);
      }
      // 否則加入之
      else {
        this.selectedTagIds.push(tagId);
      }
    },
  },
  // methods end

  computed: {
    /**
     * 活動資料集，會依據選取的標籤做篩選。
     * @returns {EventTagRecord[]} 篩選後的活動資料集。
     */
    filteredEvents() {
      console.log(`[computed] filteredEvents Start ==>`, this.selectedTagIds, this.eventTagModel);

      // 有活動資料
      if (this.eventTagModel?.datas?.length > 0) {
        // 有選擇標籤，且並不是全選，則進行活動資料篩選
        if (
          this.selectedTagIds?.length > 0 &&
          this.selectedTagIds?.length < this.tagModel?.datas?.length
        ) {
          console.log(`[computed] filteredEvents 返回篩選後的活動資料...........`);
          return this.eventTagModel.filterByTagIds(this.selectedTagIds);
        }

        // 否則直接返回所有活動資料
        console.log(`[computed] filteredEvents 返回所有活動資料.............`);
        return this.eventTagModel.datas;
      }

      console.log(`[computed] filteredEvents 返回空資料........`);
      return [];
    },
  },
  // computed end

  watch: {
    /**
     * 依據活動資料製作分頁工具。
     * @param {EventTagRecord[]} n 篩選後的活動資料集。
     */
    filteredEvents(n) {
      console.log(`[watch filteredEvents] new ==>`, n.length, n);
      this.pagination = usePagination(n, 3);
      console.log(`[watch filteredEvents] this.pagination =====>`, this.pagination);
    },
  },

  components: {
    EventCard,
  },

  beforeCreate() {
    console.log(`[EventListView] beforeCreate........`);
  },

  created() {
    console.log(`[EventListView] created........`, this);
    console.log(`history.state ======>`, history.state);

    // 若有傳入的 Tag ID 則選取之
    const queryTagId = history.state.tagId;
    if (queryTagId && queryTagId > 0) {
      this.selectedTagIds.push(queryTagId);
    }

    // 取得標籤、活動
    useEventTag().then((res) => {
      this.tagModel = res.tagModel;
      this.eventTagModel = res.eventTagModel;

      // TODO DELETE
      // console.log(`res ========>`, res);
      // console.log(res.tagModel);
      // console.log(res.eventTagModel);
      // console.log(`this.tagModel =====>`, this.tagModel);
      // console.log(`this.eventTagModel =====>`, this.eventTagModel);
    });
  },
  // created end

  mounted() {
    console.log(`[EventListView] mounted........`);
  },
};
</script>

<style lang="scss" scoped></style>
