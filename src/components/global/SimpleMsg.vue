<template>
  <div class="container py-3">
    <p class="text-center font-noto-sans-tc fs-18">{{ props.message }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
});
</script>
