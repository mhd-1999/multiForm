<template>
  <div id="app">
    <HeaderForm :currentStep="currentStep" :step="step"></HeaderForm>
    <keep-alive> <component v-bind:is="component" /> </keep-alive>
    <ButtonForm
      @handleNext="handleNext"
      @handleBack="handleBack"
      :currentStep="currentStep"
    ></ButtonForm>
  </div>
</template>

<script>
import FirstForm from "./components/ApplyForm/FirstStep.vue";
import SecondForm from "./components/ApplyForm/SecondStep.vue";
import ThirdForm from "./components/ApplyForm/ThirdStep.vue";
import FinalStep from "./components/ApplyForm/FinalStep.vue";
import { step } from "./data/data.js";
import HeaderForm from "./components/ApplyForm/HeaderForm.vue";
import ButtonForm from "./components/OverForm/ButtonForm.vue";
export default {
  name: "App",
  data() {
    return {
      currentStep: 1,
      component: FirstForm,
      step: step,
      isActive: false,
    };
  },
  methods: {
    handleNext() {
      if (this.component === FirstForm) {
        this.component = SecondForm;
        this.currentStep = 2;
      } else if (this.component === SecondForm) {
        this.component = ThirdForm;
        this.currentStep = 3;
      } else if (this.component === ThirdForm) {
        this.component = FinalStep;
        this.currentStep = 4;
      }
    },
    handleBack() {
      if (this.component === ThirdForm) {
        this.component = SecondForm;
        this.currentStep = 2;
      } else if (this.component === SecondForm) {
        this.component = FirstForm;
        this.currentStep = 1;
      }
    },
  },
  computed: {
    info() {
      return this.$store.getters.info;
    },
  },
  components: { HeaderForm, ButtonForm },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
