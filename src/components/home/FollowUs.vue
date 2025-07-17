<template>
  <div class="container mb-12 mb-md-15">
    <div class="d-flex flex-column flex-xl-row row-gap-6">
      <!-- #FOLLOW US -->
      <section class="w-xl-50 border border-2 border-primary border-end-xl-0">
        <h2
          class="fs-24 fs-md-32 fw-bold font-noto-serif-tc py-4 px-3 px-md-8 border-bottom border-2 border-primary"
        >
          #FOLLOW US
        </h2>

        <div class="py-4 py-md-8 px-3 px-md-8 text-black font-noto-sans-tc">
          <p class="mb-4 mb-md-8">
            想第一時間獲得新奇有趣的活動資訊？<br />
            追蹤我們的社群吧！<br />
            也歡迎你聯繫我們，提供好玩有趣的活動企劃。
          </p>

          <!-- 聯繫資訊 -->
          <ul>
            <li class="contact-info">
              <a href="mailto:7tao.event@gmail.com" class="contact-info-link" @click.prevent>
                <i class="icofont-ui-email"></i>
                <span>7tao.event@gmail.com</span>
              </a>
            </li>
            <li class="contact-info">
              <a href="tel:+886-9123123123" class="contact-info-link" @click.prevent>
                <i class="icofont-phone"></i>
                <span>09123123123</span>
              </a>
            </li>
            <li class="contact-info">
              <a href="#" class="contact-info-link" @click.prevent>
                <i class="icofont-facebook"></i>
                <span>7TAO七逃</span>
              </a>
            </li>
          </ul>
          <!-- 聯繫資訊 end -->
        </div>
      </section>
      <!-- #FOLLOW US end -->

      <!-- #SUBSCRIBE US -->
      <section class="w-xl-50 border border-2 border-primary d-flex flex-column">
        <h2
          class="fs-24 fs-md-32 fw-bold font-noto-serif-tc py-4 ps-3 ps-md-8 border-bottom border-2 border-primary"
        >
          #SUBSCRIBE US
        </h2>

        <div ref="formSubscription" class="vl-parent h-100">
          <VeeForm
            v-slot="{ errors }"
            class="h-100 d-flex flex-column justify-content-between"
            @submit="subscribe"
          >
            <div class="py-4 px-3 p-md-8 pb-xl-0">
              <p class="mb-4 mb-md-8">
                訂閱電子報送折價券！<br />
                定期精選文章資訊及最新優惠資訊，<br />
                還不通通給我訂閱起來？
              </p>
              <VeeField
                type="email"
                name="email"
                :class="['subscribe-input', 'form-control', errors.email ? 'is-invalid' : '']"
                placeholder="輸入Email"
                rules="required|email"
                label="Email"
              />
              <VeeErrorMessage name="email" class="invalid-feedback" />
            </div>

            <button
              class="btn btn-primary d-flex justify-content-center align-items-center w-100 py-4"
            >
              <span class="me-1">確認訂閱</span>
              <i class="icofont-rounded-double-right"></i>
            </button>
          </VeeForm>
        </div>
      </section>
      <!-- #SUBSCRIBE US end -->
    </div>
  </div>
</template>

<script>
import { TimerAlert, ConfirmAlert } from "@/helpers";
import { SubscriptionService } from "@/services/data/subscription";
import { useAreaLoading } from "@/composables";

/**
 * @typedef {object} FollowUsData
 * @property {AreaLoadingReturns} loadingSubscription 訂閱表單區域 loading。
 */
/**
 * @typedef {object} SubscriptionForm
 * @property {string} email 使用者輸入的 Email
 */

export default {
  /**
   * @returns {FollowUsData}
   */
  data() {
    return {
      loadingSubscription: null, // 訂閱表單區域 loading
    };
  },
  methods: {
    /**
     * 訂閱。
     * @param {SubscriptionForm} form VeeValidate 彙整的表單資料（會被自動傳入）。
     */
    subscribe(form) {
      this.loadingSubscription.open();

      SubscriptionService.subscribe(form)
        .then(() => {
          TimerAlert.alertSuccess("訂閱成功");
        })
        .catch((error) => {
          console.error(error);
          ConfirmAlert.alertErrorDetail("訂閱失敗", error.message);
        })
        .finally(() => {
          this.loadingSubscription.close();
        });
    },
  },

  mounted() {
    // 初始化訂閱表單的區域 loading
    this.loadingSubscription = useAreaLoading(this.$refs.formSubscription);
  },

  beforeUnmount() {
    // 清除物件，避免潛在記憶體洩漏
    this.loadingSubscription = null;
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/mixins/style";

/* 聯繫資訊 */
.contact-info {
  &:not(:last-child) {
    margin-bottom: 16px;
  }
}

// 聯繫資訊 - 連結
.contact-info-link {
  display: flex;
  align-items: center;
  width: fit-content;

  // icon
  i {
    background-color: var(--bs-primary);
    color: white;
    padding: 8px;
    margin-right: 16px;
  }

  // 滑鼠懸停時的樣式
  @include style.only-pointer-hover {
    text-decoration: underline;
  }
}

/* 訂閱 */
.subscribe-input {
  padding: 14px 20px;
}
</style>
