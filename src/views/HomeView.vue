<template>
  <div class="container">
    <!-- Banner -->
    <BannerSlide />

    <!-- 重點連結 -->
    <KeyLinkArea v-if="tags" :tags="tags" />

    <!-- 活動資訊 -->
    <EventInfo v-if="tags && events" />
  </div>
</template>

<script>
import { computed } from "vue";
import { EventApi, TagApi } from "@/api";
import BannerSlide from "@/components/home/BannerSlide.vue";
import EventInfo from "@/components/home/EventInfo.vue";
import KeyLinkArea from "@/components/home/KeyLinkArea.vue";

export default {
  data() {
    console.log(`## [HomeView - data]`);
    return {
      tags: null, // 標籤資料
      events: null, // 活動資料
      // albums
      albums: [],
    };
  },
  // data end

  provide() {
    return {
      tags: computed(() => this.tags),
      events: computed(() => this.events),
    };
  },

  methods: {},
  computed: {},
  watch: {},

  components: {
    BannerSlide,
    KeyLinkArea,
    EventInfo,
  },

  beforeCreate() {
    console.log(`## [HomeView - beforeCreate]`);

    // 取得標籤、活動
    Promise.all([TagApi.fetchTags(), EventApi.fetchEvents()]).then((resList) => {
      // console.log(`[HomeView] res ==>`, resList);
      this.tags = resList[0];
      console.log(`tags ===>`, this.tags);
      // console.log(`tags ==>`, this.tags);
      // console.log(`tagUtil.getTagIdMap ==>`, tagUtil.getIdMap(this.tags));
      // console.log(`tag.searchName("活動") ==>`, tagUtil.searchByName(this.tags, "活動"));
      // console.log(`tag.searchName("藝文活動") ==>`, tagUtil.searchByName(this.tags, "藝文活動"));
      // console.log(`tag.searchName("演出") ==>`, tagUtil.searchByName(this.tags, "演出"));
      // console.log(`tag.searchName("聯誼") ==>`, tagUtil.searchByName(this.tags, "聯誼"));
      // console.log(`tag.searchName("null") ==>`, tagUtil.searchByName(this.tags, "null"));
      // const event = useEvent(resList[1].data);
      this.events = resList[1];
      console.log(`events ===>`, this.events);

      // const homeEventData = event.getHomeData();
      // this.recentEvents = homeEventData.recentEvents;
      // this.onlineEvent = homeEventData.onlineEvent;
      // console.log(`this.recentEvents ==>`, this.recentEvents);
      // console.log(`this.onlineEvent ==>`, this.onlineEvent);
    });
  },

  // TODO debug 測試
  async created() {
    console.log(`## [HomeView - created]`);
  },
  beforeMount() {
    console.log(`## [HomeView - beforeMount]`);
  },

  mounted() {
    console.log(`## [HomeView - mounted]`);
  },
  // mounted end
};
</script>

<style lang="scss" scoped></style>
