<template>
  <div class="container">
    <h2>活動資訊頁</h2>
    <p>id: {{ id }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,  // TODO test
    };
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
  components: {
  },
  
  beforeCreate() {
    
  },
};
</script>

<style lang="scss" scoped>

</style>
