<template>
  <div id="third-form">
    <form action="" @change="checkButton" v-on:submit.prevent>
      <TextArea
        label="Lý do muốn ứng tuyển vào công ty"
        isRequired
        maxLength="1000"
        :valueInput.sync="thirdForm.description"
        @handleChangeInput="handleFocusInput"
        :class="{ active: isEmpty }"
      ></TextArea>
      <h3 class="warning" v-show="this.isEmpty">{{ error.REQUIRED_NOTI }}</h3>
      <InputItem
        label="Mức lương mong muốn"
        isRequired
        :styleBox="styles"
        class="salary-box"
        type="number"
        maxLength="10"
        :valueInput.sync="thirdForm.salary"
        ><p>VND</p></InputItem
      >
    </form>
  </div>
</template>

<script>
import TextArea from "./TextArea.vue";
import InputItem from "../OverForm/InputItem.vue";
export default {
  name: "ThirdForm",
  components: { TextArea, InputItem },
  data() {
    return {
      styles:
        "min-width:81px;border-radius:4px 0 0 4px;border-right:none;max-width:90px",
      isFocus: false,
      thirdForm: {
        description: "",
        salary: "",
      },
      error: {
        REQUIRED_NOTI: "This field is not empty!",
      },
      isEmpty: false,
      isDisable: false,
    };
  },
  methods: {
    handleFocusInput() {
      if (!this.thirdForm.description) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    },
    checkButton() {
      if (this.isEmpty) {
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }
      this.$store.commit("SET_DISABLE", this.isDisable);
      this.$store.commit("SET_THIRD_FORM", this.thirdForm);
    },
  },
};
</script>

<style scoped>
#third-form {
  width: 926px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin: 0 auto;
  padding: 20px 32px;
}
label {
  margin-bottom: 6px;
}
p {
  border: 1px solid #dbdbdb;
  border-radius: 0 4px 4px 0;
  border-left: none;
  padding: 7px;
}
.warning {
  text-align: start;
  margin-bottom: 10px;
  color: red;
  font-size: 14px;
  font-weight: 400;
}
.active {
  border-color: red;
}
</style>
