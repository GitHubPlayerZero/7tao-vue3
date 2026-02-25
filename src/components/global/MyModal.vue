<template>
  <div
    ref="myModal"
    :id="id"
    :data-bs-backdrop="isAllowBackdrop ? null : 'static'"
    :data-bs-keyboard="isAllowEsc ? null : 'false'"
    :aria-labelledby="`${id}Label`"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <slot name="modalHeader">
            <p class="modal-title h5" :id="`${id}Label`">{{ title }}</p>
            <!-- Close button -->
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              tabindex="-1"
            ></button>
          </slot>
        </div>

        <!-- 內文 -->
        <div class="modal-body">
          <slot name="modalBody"></slot>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <slot name="modalFooter"></slot>
        </div>
      </div>
      <!-- modal-content  end -->
    </div>
    <!-- modal-dialog end -->
  </div>
</template>

<script setup>
import { onMounted, useTemplateRef } from "vue";
import { Modal } from "bootstrap";

// Props
defineProps({
  id: {
    type: String,
    required: true,
  },

  title: String,

  // 是否允許點擊背景關閉 Modal，預設不允許
  isAllowBackdrop: {
    type: Boolean,
    default: false,
  },

  // 是否允許按下 Esc 鍵關閉 Modal，預設允許
  isAllowEsc: {
    type: Boolean,
    default: true,
  },
});

// Emits
const emits = defineEmits(["emit-show", "emit-shown", "emit-hide", "emit-hidden"]);

// Modal 相關
const refMyModal = useTemplateRef("myModal"); // Modal 元素參考
let bsModel = null; // Bootstrap Modal 實例

// 掛載時
onMounted(() => {
  // 建立 Bootstrap Modal 實例
  bsModel = Modal.getOrCreateInstance(refMyModal.value);

  // 監聽 Modal 顯示事件（開啟前）
  refMyModal.value.addEventListener("show.bs.modal", () => {
    refMyModal.value.inert = false;
    emits("emit-show");
  });

  // 監聽 Modal 顯示完成事件（開啟後）
  refMyModal.value.addEventListener("shown.bs.modal", () => {
    emits("emit-shown");
  });

  // 監聽 Modal 隱藏事件（關閉前）
  refMyModal.value.addEventListener("hide.bs.modal", () => {
    refMyModal.value.inert = true;
    emits("emit-hide");
  });

  // 監聽 Modal 隱藏完成事件（關閉後）
  refMyModal.value.addEventListener("hidden.bs.modal", () => {
    emits("emit-hidden");
  });
});

/**
 * 開啟 Modal 視窗。
 */
function open() {
  bsModel.show();
}

/**
 * 關閉 Modal 視窗。
 */
function close() {
  bsModel.hide();
}

// 定義提供給父元件的方法及屬性
defineExpose({
  get state() {
    return { open, close };
  },
});
</script>
