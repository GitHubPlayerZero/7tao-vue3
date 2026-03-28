import { ref } from "vue";
import { defineStore } from "pinia";
import { DateStyles, DateUtils } from "@/helpers";
// eslint-disable-next-line no-unused-vars
import { OrderRecord } from "@/services/data/order";
import { useEventDetailRouter } from "@/composables";

/**
 * 訂單資料狀態管理。
 */
export const useOrderStore = defineStore(
  "orderStore",
  () => {
    const orderId = ref(null);
    const eventId = ref(null);
    const eventTitle = ref(null);
    const eventDate = ref(null);
    const ticketId = ref(null);
    const ticketType = ref(null);
    const ticketPrice = ref(null);
    const createdDate = ref(null);

    const eventDetailRouter = useEventDetailRouter();

    /**
     * 設定訂單的 ID 資料。
     * @param {number} val 訂單 ID。
     */
    function setOrderId(val) {
      orderId.value = val;
    }

    /**
     * 設定訂單的建立日期時間（createdDate）資料。
     * @param {number} val 訂單 createdDate timestamp。
     */
    function setCreatedDate(val) {
      createdDate.value = DateUtils.formatDate(val, DateStyles.yyyymmddhhmm);
    }

    /**
     * 設定訂單資料，將提供的資料內容更新到對應的狀態變數中。
     * @param {OrderRecord} orderRecord 訂單資料物件。
     */
    function set(orderRecord) {
      eventId.value = orderRecord.eventId;
      eventTitle.value = orderRecord.eventTitle;
      eventDate.value = orderRecord.eventDate;
      ticketId.value = orderRecord.ticketId;
      ticketType.value = orderRecord.ticketType;
      ticketPrice.value = orderRecord.ticketPrice;

      if (orderRecord.id) {
        setOrderId(orderRecord.id);
      }

      if (orderRecord.createdDate) {
        setCreatedDate(orderRecord.createdDate);
      }
    }

    /**
     * 重置訂單資料，將所有相關狀態變數設置為初始值。
     */
    function reset() {
      orderId.value = null;
      eventId.value = null;
      eventTitle.value = null;
      eventDate.value = null;
      ticketId.value = null;
      ticketType.value = null;
      ticketPrice.value = null;
      createdDate.value = null;
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
      orderId,
      eventId,
      eventTitle,
      eventDate,
      ticketId,
      ticketType,
      ticketPrice,
      createdDate,
      setOrderId,
      setCreatedDate,
      set,
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
