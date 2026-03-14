<template>
  <div class="container mt-6 mt-md-15 mb-12 mb-md-15">
    <div class="row">
      <div class="col-md-11 col-xl-7 mx-auto">
        <!-- 流程 -->
        <OrderSteps class="mb-6 mb-md-12" />

        <!-- 活動標題 -->
        <h2
          class="fs-32 fs-md-48 mb-6 mb-md-8 lh-1d438 font-noto-serif-tc fw-bold letter-spacing-5"
        >
          {{ order.eventTitle }}
        </h2>

        <!-- 票券資訊 -->
        <table class="mb-8 mb-md-12 table table-order">
          <tbody>
            <tr>
              <th scope="row">日期</th>
              <td>{{ order.eventDate }}</td>
            </tr>
            <tr>
              <th scope="row">票種</th>
              <td>{{ order.ticketType }}</td>
            </tr>
            <tr>
              <th scope="row">票價</th>
              <td>${{ order.ticketPrice }}</td>
            </tr>
          </tbody>
        </table>

        <!-- 按鈕區 -->
        <button type="button" class="btn btn-primary fs-20 py-2 mb-4" @click="buy">
          <span class="btn-primary-text">確認購票</span>
          <i class="icofont-rounded-double-right"></i>
        </button>

        <a href="#" class="cancel" @click.prevent="cancel"> 取消購票 </a>
      </div>
      <!-- col end -->
    </div>
    <!-- row end -->
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useOrderStore } from "@/stores";
import OrderSteps from "@/components/order/OrderSteps.vue";

export default {
  data() {
    return {
      order: {}, // 訂單資料
    };
  },

  created() {
    // 取得訂單資料
    this.order = useOrderStore();
  },

  methods: {
    /** 確認購票 */
    buy() {
      this.$router.push({ name: "orderCheckout" });
    },

    /** 訂單相關功能 */
    ...mapActions(useOrderStore, ["cancel"]),
  },

  components: { OrderSteps },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/font";

.cancel {
  @include font.noto-sans-tc;
  font-size: 18px;
  display: block;
  text-align: center;
  padding: 5px 0;

  &:hover {
    color: var(--bs-hover);
  }
}
</style>
