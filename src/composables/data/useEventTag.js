import { ref } from "vue";
import { EventService, EventTagModel } from "@/services/data/event";
import { TagService, TagModel } from "@/services/data/tag";

/**
 * 使用 Tag、Event 資料，Event 會整合 Tag 資料。
 * @returns {Promise<{tagModel: TagModel, eventTagModel: EventTagModel}>} 回傳以 ref 包裝的響應式 TagModel 及 EventTagModel。
 */
export async function useEventTag() {
  const tagModel = ref(null);
  const eventTagModel = ref(null);

  await Promise.all([TagService.fetchTags(), EventService.fetchEvents()]).then((resList) => {
    tagModel.value = new TagModel(resList[0]);
    eventTagModel.value = new EventTagModel(resList[1], tagModel.value);
  });

  return { tagModel, eventTagModel };
}
