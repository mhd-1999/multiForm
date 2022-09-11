<template>
  <div id="first-layout">
    <form
      id="first-form"
      method="get"
      @change="checkButton"
      v-on:submit.prevent
    >
      <InputItem
        label="Họ và tên"
        name="full-name"
        type="text"
        isRequired
        :valueInput.sync="firstForm.fullName"
        @handleChangeInput="handleFocusInput"
        :class="{
          active: checkStatus.isEmpty || checkStatus.isOver,
        }"
      ></InputItem>
      <p class="warning" v-show="checkStatus.isEmpty">
        {{ error.REQUIRED_NOTI }}
      </p>
      <p class="warning" v-show="checkStatus.isOver">{{ error.INP_LENGTH }}</p>
      <InputItem
        label="Ngày sinh"
        name="date-picker"
        type="date"
        isRequired
        :valueInput.sync="firstForm.date"
        @handleChangeInput="checkDateOfBirth"
        :class="{ active: checkStatus.isDate }"
      ></InputItem>
      <p class="warning" v-show="checkStatus.isDate">{{ error.DATE_OVER }}</p>
      <SelectCity
        :list="list"
        label="Thành Phố"
        :selectValue.sync="firstForm.city"
      ></SelectCity>
      <MultiInput
        placeHolder="Chọn các vị trí mà bạn muốn"
        :valueInput.sync="searchValue"
        :fieldTags="fieldTags"
        :poisition="poisition"
        :poisitionField="firstForm.poisition"
        :searchValue="searchValue"
        @handleAddTag="handleAddTag($event)"
        @handleDeleteTag="handleDeleteTag($event)"
      ></MultiInput>
      <TextArea
        label="Mô tả về bản thân"
        :valueInput.sync="firstForm.description"
        :class="{ active: firstForm.description.length > 1000 }"
        maxLength="1000"
      ></TextArea>
      <p :class="{ active: firstForm.description.length == 1000 }">
        {{ firstForm.description.length }}/1000
      </p>
      <DropZone 
        label="Ảnh cá nhân"
       :imageSrc="imageSrc" 
       @handleChangeImage="handleChangeImage" 
       @handleRemoveImage="handleRemoveImage"
      ></DropZone>
    </form>
  </div>
</template>
<script>
import InputItem from "../OverForm/InputItem.vue";
import SelectCity from "./SelectCity.vue";
import MultiInput from "./MultiInput.vue";
import TextArea from "./TextArea.vue";
import DropZone from "./DropZone.vue";
import axios from "axios";
import { CITY_API, poisition } from "@/data/data";
export default {
  name: "FirstForm",
  components: {
    InputItem,
    SelectCity,
    MultiInput,
    TextArea,
    DropZone,
  },
  data() {
    return {
      isRequired: true,
      isDisable: false,
      isShow: false,
      searchValue: "",
      poisition,
      list: [],
      imageSrc:"",
      error: {
        REQUIRED_NOTI: "This field is not empty!",
        INP_LENGTH: "Over 100 characters!",
        DATE_OVER: "Select a date that is less than the current date!",
      },
      checkStatus: {
        isEmpty: false,
        isOver: false,
        isOverArea: false,
        isDate: false,
      },
      firstForm: {
        fullName: "",
        date: "",
        city: "",
        poisition: [],
        description: "",
        image:"",
      },
    };
  },
  methods: {
    async listBox() {
      try {
        const res = await axios.get(CITY_API);
        this.list = res.data;
      } catch (error) {
        console.error(error);
      }
    },

    handleFocusInput() {
      if (!this.firstForm.fullName) {
        this.checkStatus.isEmpty = true;
        this.checkStatus.isOver = false;
      } else if (this.firstForm.fullName.length > 10) {
        this.checkStatus.isOver = true;
        this.checkStatus.isEmpty = false;
      } else {
        this.checkStatus.isEmpty = false;
        this.checkStatus.isOver = false;
      }
    },
    handleChangeImage(e){
      let file = e.target.files[0] || e.dataTransfer.files;
      this.firstForm.image = URL.createObjectURL(file);
      this.imageSrc=URL.createObjectURL(file);
      console.log(file);
    },
    handleRemoveImage(){
      this.imageSrc=""
    },
    checkButton() {
      if (
        this.checkStatus.isOver ||
        this.checkStatus.isEmpty ||
        this.checkStatus.isOverArea ||
        this.checkStatus.isDate
      ) {
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }
      this.$store.commit("SET_DISABLE", this.isDisable);
      this.$store.commit("SET_FIRST_FORM", this.firstForm);
    },
    checkDateOfBirth() {
      const dateNow = new Date();
      const dateSelect = new Date(this.firstForm.date);
      console.log(dateSelect);
      console.log(dateNow);
      if (dateNow <= dateSelect) {
        this.checkStatus.isDate = true;
      } else {
        this.checkStatus.isDate = false;
      }
    },
    handleAddTag(item) {
      if (this.firstForm.poisition.includes(item)) {
        this.firstForm.poisition.slice(item, 1);
      } else {
        this.firstForm.poisition.push(item);
      }
    },
    handleDeleteTag(id) {
      let i = this.firstForm.poisition.findIndex((item) => item == id);
      this.firstForm.poisition.splice(i, 1);
    },
  },
  computed: {
    fieldTags() {
      return this.poisition.filter((item) =>
        item.name.toLowerCase().match(this.searchValue.toLowerCase())
      );
    },
  },
  created() {
    this.listBox();
  },
};
</script>

<style scoped>
#first-layout {
  display: flex;
  flex-direction: column;
  width: 926px;
  margin: 0 auto;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 20px 14px;
}
p {
  text-align: start;
  margin-bottom: 10px;
}
p.active {
  color: red;
}
.active textarea {
  border-color: red !important;
}

.warning {
  color: red;
}
</style>
