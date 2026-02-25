<template>
  <div class="container py-3 flex-shrink-0 flex-grow-1">
    <p class="text-center font-noto-sans-tc fs-18">{{ props.message }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
});
</script>
