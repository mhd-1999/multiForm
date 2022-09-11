<template>
  <div class="input-item">
    <label :for="name"><span v-show="isRequired">Must</span>{{ label }}</label>
    <div class="input-zone">
      <input
        :type="type"
        :id="name"
        :placeholder="placeholder"
        :value="valueInput"
        @input="onInputValue"
        @change="handleChangeInput"
        :maxlength="maxLength"
        :style="styleBox"
        :class="classBox"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputItem",
  props: {
    label: String,
    placeholder: String,
    classBox: String,
    type: String,
    name: String,
    valueInput: String,
    maxLength: String,
    styleBox: String,
    isRequired: {
      type: Boolean,
    },
  },
  methods: {
    onInputValue(e) {
      const inputText = e.target.value;
      this.$emit("update:valueInput", inputText);
    },
    handleChangeInput() {
      this.$emit("handleChangeInput");
    },
  },
};
</script>

<style scoped>
.input-item {
  display: flex;
  flex-direction: column;
  width: 528px;
  text-align: start;
  margin-bottom: 10px;
}
.input-item label {
  margin-bottom: 6px;
}
.input-item span {
  font-size: 12px;
  color: #fff;
  padding: 5px 8px;
  background-color: #627d98;
  line-height: 20px;
  border-radius: 3px;
  margin-right: 8px;
}
.input-item input {
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  width: 100%;
}
.input-item p {
  display: inline-block;
}
.input-item input[type="date"] {
  width: 118px;
  margin-right: 48px;
  font-size: 12px;
}
.input-zone {
  position: relative;
}
.active input[type="date"] {
  border-color: red !important;
  color: red;
}
.active input {
  border-color: red;
  color: red;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
