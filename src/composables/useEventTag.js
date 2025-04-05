import { ref } from "vue";
import { EventService, EventTagModel } from "@/service/event";
// eslint-disable-next-line no-unused-vars
import { TagService, TagModel } from "@/service/tag";

/**
 * 使用 Tag、Event 資料。Event 會整合 Tag 資料。
 * @returns {Promise<{tagModel: TagModel, eventTagModel: EventTagModel}>} 回傳以 ref 包裝的響應式 TagModel 及 EventTagModel。
 */
export async function useEventTag() {
  const tagModel = ref(null);
  const eventTagModel = ref(null);

  await Promise.all([TagService.prepareTagModel(), EventService.fetchEvents()]).then((resList) => {
    tagModel.value = resList[0];
    eventTagModel.value = new EventTagModel(resList[1], tagModel.value);
  });

  return { tagModel, eventTagModel };
}
