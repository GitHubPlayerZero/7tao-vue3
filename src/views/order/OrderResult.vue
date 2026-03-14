<template>
  <div class="container mt-6 mt-md-15 mb-12 mb-md-15">
    <div class="row">
      <div class="col-md-11 col-xl-7 mx-auto">
        <!-- 流程 -->
        <OrderSteps class="mb-8 mb-md-12" :step="3" />

        <h3 class="mb-8">
          <IconTitle title="訂購成功" icon="icofont-check-circled" />
        </h3>

        <table class="mb-8 mb-md-12 table table-order">
          <tbody>
            <tr>
              <th scope="row">票券</th>
              <td>{{ `${order.ticketType} $${order.ticketPrice}` }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- col end -->
    </div>
    <!-- row end -->
  </div>
</template>

<script>
import { useOrderStore } from "@/stores";
import OrderSteps from "@/components/order/OrderSteps.vue";
import IconTitle from "@/components/global/IconTitle.vue";

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

  components: {
    OrderSteps,
    IconTitle,
  },
};
</script>
