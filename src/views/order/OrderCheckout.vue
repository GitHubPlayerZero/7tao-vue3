<template>
  <div class="container mt-6 mt-md-15 mb-12 mb-md-15">
    <div class="row">
      <div class="col-md-11 col-xl-7 mx-auto">
        <!-- 流程 -->
        <OrderSteps class="mb-6 mb-md-12" :step="2" />

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
              <th scope="row">票券</th>
              <td>{{ `${order.ticketType} $${order.ticketPrice}` }}</td>
            </tr>
          </tbody>
        </table>

        <!-- 結帳資訊 -->
        <h3 class="mb-4">
          <IconTitle title="結帳資訊" />
        </h3>

        <table class="mb-8 mb-md-12 table table-order">
          <tbody>
            <tr>
              <th scope="row">聯絡人姓名</th>
              <td>{{ user.name }}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <th scope="row">手機</th>
              <td>{{ user.mobilePhone }}</td>
            </tr>
            <tr>
              <th scope="row">身份證字號</th>
              <td>{{ user.rocId }}</td>
            </tr>
          </tbody>
        </table>

        <!-- 按鈕區 -->
        <button type="button" class="btn btn-primary fs-20 py-2 mb-4" @click="buy">
          <span class="btn-primary-text">結帳</span>
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
import { useLoadingStore, useOrderStore, useUserStore } from "@/stores";
import { ErrorHelper } from "@/helpers";
import OrderSteps from "@/components/order/OrderSteps.vue";
import IconTitle from "@/components/global/IconTitle.vue";

export default {
  data() {
    return {
      order: {}, // 訂單資料
      user: {}, // 使用者資料
    };
  },

  created() {
    this.openLoading();

    // 取得訂單資料
    this.order = useOrderStore();

    // 取得使用者資料
    this.getUser()
      .then((data) => {
        this.user.name = data.name;
        this.user.email = data.email;
        this.user.mobilePhone = data.mobilePhone;
        this.user.rocId = data.rocId;
      })
      .catch((error) => {
        console.error(error);
        console.error(`[created] 取得使用者資料失敗：`, ErrorHelper.getErrorMsg(error));
      })
      .finally(() => {
        this.closeLoading();
      });
  },

  methods: {
    /** 結帳 */
    buy() {
      this.$router.push({ name: "orderResult" });
    },

    /** loading 功能 */
    ...mapActions(useLoadingStore, {
      openLoading: "open",
      closeLoading: "close",
    }),

    /** User 資料功能 */
    ...mapActions(useUserStore, {
      getUser: "get",
    }),

    /** 訂單相關功能 */
    ...mapActions(useOrderStore, ["cancel"]),
  },

  components: {
    OrderSteps,
    IconTitle,
  },
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
