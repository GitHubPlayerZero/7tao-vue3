<template>
  <div class="container mt-4 mt-md-8">
    <h2 class="title mb-3 mb-md-8">
      <span class="title-english">EVENT</span>
      <span class="title-chinese">所有活動</span>
    </h2>

    <!-- 標籤 -->
    <ul class="d-flex flex-wrap gap-2 mb-8" v-if="tagModel">
      <li v-for="tag in tagModel.datas" :key="tag.id">
        <button type="button" class="tag-btn">{{ tag.name }}</button>
      </li>
    </ul>

    <!-- 活動卡片 -->
    <!-- <ul class="row row-gap-6 row-gap-md-12">
      <li class="col-md-6 col-xl-4" v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </li>
    </ul> -->

    <p>tagId: {{ tagId }}</p>
    <p>page: {{ page }}</p>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { TagService, TagModel } from "@/service/tag";
// eslint-disable-next-line no-unused-vars
import { EventService, EventTagModel, EventTagRecord } from "@/service/event";
import EventCard from "@/components/global/EventCard.vue";

export default {
  /**
   * @returns {{tagModel: TagModel}}
   */
  data() {
    console.log(`$route ==>`, this.$route);

    return {
      tagModel: null,
      // events: [],

      // TODO test
      tagId: this.$route.query.tagId,
      page: this.$route.query.page,
    };
  },

  methods: {},
  computed: {},
  watch: {},
  components: {
    // eslint-disable-next-line vue/no-unused-components
    EventCard,
  },

  beforeCreate() {
    // 取得標籤
    TagService.prepareTagModel()
      .then((tagModel) => {
        // console.log(`tagModel =====>`, tagModel);
        this.tagModel = tagModel;

        // 取得活動
        // return EventService.prepareEventTagModel(tagModel);
      })
      // .then((eventTagModel) => {
      //   this.eventTagModel = eventTagModel;
      //   // console.log(`eventTagModel ========>`, eventTagModel);
      //   // console.log(`events ===>`, this.events);
      // });
  },
};
</script>

<style lang="scss" scoped></style>
