<template>
  <article>
    <!-- 標題 -->
    <h2 class="title mb-2 mb-md-0">
      <span class="title-english">TICKET</span>
      <span class="title-chinese">購票資訊</span>
    </h2>

    <!-- 票種表格 -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" class="th-date">活動日期</th>
          <th scope="col">票種</th>
          <th scope="col" class="th-price">票價</th>
          <th scope="col" class="th-purchase">購票</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <!-- 活動日期 -->
          <td>{{ event.date }}</td>
          <!-- 票種 -->
          <td class="td-type">{{ ticket.type }}</td>
          <!-- 票價 -->
          <td class="td-price">${{ ticket.price }}</td>
          <!-- 購票 -->
          <td class="td-purchase">
            <button
              type="button"
              class="px-3 px-md-6 py-2 btn btn-outline-primary font-noto-serif-tc"
              @click.prevent="purchase(ticket)"
            >
              <span class="d-none d-md-inline">立即</span>購票
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
import { mapActions } from "pinia";
import { useLoadingStore } from "@/stores";
import { ConfirmAlert } from "@/helpers";
import { EventTagRecord } from "@/services/data/event";
// eslint-disable-next-line no-unused-vars
import { TicketRecord, TicketModel, TicketService } from "@/services/data/ticket";

export default {
  /**
   * @property {EventTagRecord} event 活動資料。
   */
  props: {
    event: {
      type: EventTagRecord,
      required: true,
    },
  },

  /**
   * @returns {{ tickets: TicketRecord[] }}
   */
  data() {
    return {
      tickets: [],
    };
  },

  created() {
    this.openLoading();

    // 取得票券資訊
    TicketService.fetchEventTickets(this.event.id)
      .then((res) => {
        this.tickets = new TicketModel(res).datas;
      })
      .finally(() => {
        this.closeLoading();
      });
  },

  methods: {
    /** loading 功能 */
    ...mapActions(useLoadingStore, {
      openLoading: "open",
      closeLoading: "close",
    }),

    /**
     * 購買票券。
     * @param {TicketRecord} ticket 被點擊的票券資料。
     */
    // eslint-disable-next-line no-unused-vars
    purchase(ticket) {
      // TODO 購票功能
      ConfirmAlert.alertWarningDetail("施工中...", "購票功能尚未開放，敬請期待！");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/rwd";

// 票券表格
.table {
  // 所有標題欄位
  th {
    // Pad 以上裝置
    @include rwd.pad-up {
      // 加大上下留白
      padding-top: 16px;
      padding-bottom: 16px;
    }
  }

  // 所有內容欄位
  td {
    // 手機版
    @include rwd.pad-down {
      font-size: 14px; // 使用較小字體
    }
  }

  // 標題 - 活動日期
  .th-date {
    @include rwd.pad-up {
      width: 20%;
    }
    @include rwd.desktop-up {
      width: 30%;
    }
  }

  // 標題 - 票價、購票
  .th-price,
  .th-purchase {
    // 手機版
    @include rwd.pad-down {
      text-align: center; // 標題置中
    }
  }

  // 標題 - 票價
  .th-price {
    // Pad 以上裝置
    @include rwd.pad-up {
      padding-left: 12px; // 增加左邊留白
      width: 19%;
    }

    // 桌機以上裝置
    @include rwd.desktop-up {
      width: 25%;
    }
  }

  // 標題 - 購票
  .th-purchase {
    @include rwd.pad-up {
      width: 21.5%;
    }
    @include rwd.desktop-up {
      width: 11.7%;
    }
  }

  // 內容 - 票價
  .td-type {
    // 手機版
    @include rwd.pad-down {
      padding-right: 0; // 移除右邊留白以增加字數容量
    }
  }

  // 內容 - 票價
  .td-price {
    text-align: right; // 靠右
  }

  // 內容 - 購票
  .td-purchase {
    white-space: nowrap; // 不斷行
    text-align: right; // 靠右

    // Pad 以上裝置
    @include rwd.pad-up {
      // 右邊留白
      padding-left: 0;
      padding-right: 16px;
    }
  }
}
</style>
