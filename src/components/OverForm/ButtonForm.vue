<template>
  <div class="button-control">
    <button @click="handleBack" v-show="currentStep > 1 && currentStep < 4">
      Quay lại
    </button>
    <button
      @click="handleNext"
      v-show="currentStep < 3"
      :class="{ active: currentStep == 2 }"
      form="first-form"
      :disabled="isDisabled"
    >
      Tiếp
    </button>
    <button
      @click="handleNext"
      type="submit"
      v-show="currentStep == 3"
      :class="{ active: currentStep == 3 }"
      :disabled="isDisabled"
    >
      Hoàn Thành
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonControl",
  props: {
    currentStep: Number,
  },
  methods: {
    handleBack() {
      this.$emit("handleBack");
    },
    handleNext() {
      this.$emit("handleNext");
    },
  },
  computed: {
    isDisabled() {
      return this.$store.getters.isDisable;
    },
  },
};
</script>

<style scoped>
.button-control {
  width: 932px;
  display: flex;
  flex-direction: row;
  margin: 24px auto;
}
.button-control button {
  padding: 10px 30px;
  background: #dcdcdc;
  border-radius: 3px;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  margin-right: 26px;
}
button:disabled {
  background: red !important;
}
.button-control .active {
  background: #627d98;
  color: white;
}
</style>
