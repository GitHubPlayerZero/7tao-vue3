import { ref } from "vue";
import { defineStore } from "pinia";
import { useEventDetailRouter } from "@/composables";

/**
 * 訂單資料狀態管理。
 */
export const useOrderStore = defineStore(
  "orderStore",
  () => {
    const eventId = ref(null);
    const eventTitle = ref(null);
    const eventDate = ref(null);
    const ticketId = ref(null);
    const ticketType = ref(null);
    const ticketPrice = ref(null);

    const eventDetailRouter = useEventDetailRouter();

    /**
     * 重置訂單資料，將所有相關狀態變數設置為初始值。
     */
    function reset() {
      eventId.value = null;
      eventTitle.value = null;
      eventDate.value = null;
      ticketId.value = null;
      ticketType.value = null;
      ticketPrice.value = null;
    }

    /**
     * 取消訂單流程，導航回活動詳細資訊頁面。
     */
    function cancel() {
      eventDetailRouter.goToEventDetailPage({
        id: eventId.value,
        title: eventTitle.value,
      });

      reset(); // 清除訂單資料
    }

    return {
      eventId,
      eventTitle,
      eventDate,
      ticketId,
      ticketType,
      ticketPrice,
      cancel,
      reset,
    };
  },
  {
    // 持久化設定
    persist: {
      storage: sessionStorage, // 使用 sessionStorage 來存儲資料
    },
  }
);
