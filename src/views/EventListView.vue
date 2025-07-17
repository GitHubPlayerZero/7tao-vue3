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
          @click="toggleTag(tag.id)"
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
  </div>
</template>

<script>
// TODO 待檢查優化
import { mapActions } from "pinia";
import { useLoadingStore } from "@/stores";
// eslint-disable-next-line no-unused-vars
import { TagModel } from "@/services/data/tag";
// eslint-disable-next-line no-unused-vars
import { EventTagModel, EventTagRecord } from "@/services/data/event";
import { EventListHistState } from "@/services/features";
import { useEventTag, usePagination, PaginationParam } from "@/composables";
import EventCard from "@/components/global/EventCard.vue";

export default {
  /**
   * @returns {{selectedTagIds: number[], tagModel: TagModel, eventTagModel: EventTagModel, pagination: Pagination, pageSize: number}}
   */
  data() {
    return {
      selectedTagIds: EventListHistState.getTagData(), // 選取的標籤，由 history state 初始化
      tagModel: null, // 標籤資料模型
      eventTagModel: null, // 活動資料模型
      pagination: null, // 分頁工具
      pageSize: 12, // 預設一頁筆數
    };
  },

  methods: {
    /** loading 功能 */
    ...mapActions(useLoadingStore, {
      openLoading: "open",
      closeLoading: "close",
    }),

    /**
     * 按下 Tag 按鈕要處理的動作。
     * @param tagId {number} Tag ID。
     */
    toggleTag(tagId) {
      const index = this.selectedTagIds.indexOf(tagId);

      // Tag 已存在則刪除之
      if (index >= 0) {
        this.selectedTagIds.splice(index, 1);
        /**
         * watch selectedTagIds 相關說明：
         * 若要使用 watch 監聽 selectedTagIds 並確保它會最先被執行，就不能直接使用 splice。
         * 直接使用 splice 會先觸發 filteredEvents 的 computed，接著就會觸發其 watch，之後才會觸發 watch selectedTagIds，此情況下會因為頁碼尚未被更新而造成問題。
         * 因此程式必須改用以下做法：
         * const newTagIds = this.selectedTagIds.toSpliced(index, 1);
         * this.selectedTagIds = newTagIds;
         */
      }
      // 否則加入之
      else {
        this.selectedTagIds.push(tagId);
      }

      /**
       * watch selectedTagIds 相關說明：
       * 這段原本是寫成 watch 監聽 selectedTagIds，但由於會有一些不保險的因素，因此移至這邊進行更新。
       */
      // 依據選取的標籤更新 history state
      EventListHistState.updateTagData(this.selectedTagIds);
      // 變更 history state 裡的頁碼由第 1 頁開始
      EventListHistState.updatePageData(1);
    },
  },
  // methods end

  computed: {
    /**
     * 活動資料集，會依據選取的標籤做篩選。
     * @returns {EventTagRecord[]} 篩選後的活動資料集。
     */
    filteredEvents() {
      // console.log(`[computed] filteredEvents Start ==>`, this.selectedTagIds, this.eventTagModel);

      // 有活動資料
      if (this.eventTagModel?.datas?.length > 0) {
        // 有選擇標籤，且並不是全選，則進行活動資料篩選
        if (
          this.selectedTagIds?.length > 0 &&
          this.selectedTagIds?.length < this.tagModel?.datas?.length
        ) {
          return this.eventTagModel.filterByTagIds(this.selectedTagIds);
        }

        // 否則直接返回所有活動資料
        return this.eventTagModel.datas;
      }

      return [];
    },
  },
  // computed end

  watch: {
    /**
     * watch selectedTagIds 相關說明：
     * 必須放在 filteredEvents 之前才能先被執行，這樣感覺很不保險。
     * 再加上，selectedTagIds 在移除標籤時必須使用特定寫法才能確保此會先被執行。
     * 這些因素感覺容易成為潛在的地雷，因此先不使用 watch selectedTagIds 的做法。
     * 但仍保留此段程式註解，以茲說明。
     */
    /* selectedTagIds: {
      deep: true,
      handler(n) {
        console.log(`[watch selectedTagIds] [before] ======>`, history.state);
        // 依據選取的標籤更新 history state
        EventListHistState.updateTagData(n);
        // 變更 history state 裡的頁碼由第 1 頁開始
        EventListHistState.updatePageData(1);
        console.log(`[watch selectedTagIds] [after] ======>`, history.state);
      },
    }, */

    /**
     * 依據活動資料製作分頁工具。
     * @param {EventTagRecord[]} n 篩選後的活動資料集。
     */
    filteredEvents(n) {
      // console.log(`[watch filteredEvents] new ==>`, n.length, n);

      // 由 history state 取回頁碼
      const pageNo = EventListHistState.getPageData();
      // console.log(`[watch filteredEvents] pageNo ====> ${pageNo}`);

      const param = new PaginationParam(n, this.pageSize, pageNo);
      this.pagination = usePagination(param);
      // console.log(`[watch filteredEvents] this.pagination =====>`, this.pagination);
    },

    /**
     * 依據分頁工具裡的頁碼更新 history state 的頁碼。
     * @param {number} n 頁碼。
     */
    "pagination.currentPage"(n) {
      // console.log(`[watch pagination] =======>`, n);
      EventListHistState.updatePageData(n);
    },

    /**
     * 當本頁資料改變時，自動捲動到最上面。
     */
    "pagination.currentDatas"() {
      window.scrollTo({ top: 0 });
    },
  },
  // watch end

  components: {
    EventCard,
  },

  created() {
    // console.log(`[EventListView] created........`, this);
    // console.log(`history.state ======>`, history.state);
    this.openLoading();

    // 取得標籤、活動
    useEventTag()
      .then((res) => {
        this.tagModel = res.tagModel;
        this.eventTagModel = res.eventTagModel;

        // TODO DELETE
        // console.log(`res ========>`, res);
        // console.log(res.tagModel);
        // console.log(res.eventTagModel);
        // console.log(`this.tagModel =====>`, this.tagModel);
        console.log(`this.eventTagModel =====>`, this.eventTagModel);
      })
      .finally(() => {
        this.closeLoading();
      });
  },
  // created end
};
</script>
