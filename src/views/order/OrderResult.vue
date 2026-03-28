<template>
  <div class="container mt-6 mt-md-15 mb-12 mb-md-15">
    <div class="row">
      <div class="col-md-11 col-xl-7 mx-auto">
        <!-- 流程 -->
        <OrderSteps class="mb-8 mb-md-12" :step="3" />

        <h3 class="mb-8">
          <IconTitle title="訂購成功" icon="icofont-check-circled" />
        </h3>

        <table class="table table-order mb-4">
          <tbody>
            <tr>
              <th scope="row">訂單編號</th>
              <td>{{ orderHisState.orderNo }}</td>
            </tr>
            <tr>
              <th scope="row">訂購時間</th>
              <td>{{ order.createdDate }}</td>
            </tr>
            <tr>
              <th scope="row">票券</th>
              <td>{{ `${order.ticketType} $${order.ticketPrice}` }}</td>
            </tr>
            <tr>
              <th scope="row">取票序號</th>
              <td class="text-notice fw-bold">{{ orderHisState.collectionNo }}</td>
            </tr>
            <tr>
              <th scope="row">取票號碼</th>
              <td class="text-notice fw-bold">{{ orderHisState.ticketNo }}</td>
            </tr>
          </tbody>
        </table>

        <p class="remark">
          請至 7-Eleven 完成取票，請於 ibon
          點選【購票/取票/訂房】>【售票系統】>【取票】>【拓元售票系統】。<br />
          若您未前往取票，本筆交易仍視為完成，不可取消訂單。<br />
          若需退票，請按照退票辦法進行申請。
        </p>
      </div>
      <!-- col end -->
    </div>
    <!-- row end -->
  </div>
</template>

<script>
import { useOrderStore } from "@/stores";
import { OrderHisRecord } from "@/services/data/order/orderHisRecord";
import OrderSteps from "@/components/order/OrderSteps.vue";
import IconTitle from "@/components/global/IconTitle.vue";

export default {
  /**
   * @returns {{orderHisState: OrderHisRecord}}
   */
  data() {
    return {
      orderHisState: null, // 訂單的 history state 資訊
    };
  },

  created() {
    this.orderHisState = OrderHisRecord.getHisRecord();
  },

  computed: {
    // 訂單資料
    order() {
      return { ...useOrderStore() };
    },
  },

  components: {
    OrderSteps,
    IconTitle,
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/font";

.remark {
  @include font.noto-sans-tc;
  color: #4f4f4f;
}
</style>
