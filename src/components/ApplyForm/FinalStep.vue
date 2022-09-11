<template>
  <div class="json-demo">
    {{ info }}
  </div>
</template>

<script>
export default {
  name: "FinalStep",
  computed: {
    info() {
      return this.$store.state.info;
    },
  },
};
</script>

<style scoped>
.json-demo {
  width: 928px;
  margin: 0 auto;
  border: 1px solid #dbdbdb;
  padding: 10px;
  border-radius: 4px;
}
</style>
