<template>
  <div id="second-form">
    <form @change="checkButton" v-on:submit.prevent>
      <div
        class="form-group"
        v-for="item in companyList"
        :key="item.id"
        :class="{ 'warning-box': checkExpCount }"
      >
        <div class="select-box">
          <SelectCity
            :list="company"
            :selectValue.sync="item.company"
          ></SelectCity>
          <button @click="handleDelete(item.id)">
            <img :src="trashIcon" alt="" />
          </button>
        </div>
        <InputItem
          label="Vị trí từng làm"
          isRequired
          type="text"
          :value="item.position"
          :valueInput.sync="item.poisition"
          :class="{ active: checkStatus.isEmpty }"
          @handleChangeInput="handleFocusInput(item)"
          maxLength="100"
        ></InputItem>
        <p class="warning" v-show="checkStatus.isEmpty">
          {{ error.REQUIRED_NOTI }}
        </p>
        <InputItem
          label="Thời gian làm việc"
          isRequired
          type="date"
          :valueInput.sync="item.start_date"
          @handleChangeInput="checkDateExp(item)"
          :class="{ active: checkStatus.isDate }"
          classBox="input-time"
          ><input
            type="date"
            v-model="item.end_date"
            @change="checkDateExp(item)"
          />
        </InputItem>
        <TextArea
          label="Mô tả về công việc"
          :value="item.des"
          :valueInput.sync="item.description"
          maxLength="1000"
        ></TextArea>
        <p :class="{ warning: item.description.length == 1000 }">
          {{ item.description.length }}/1000
        </p>
      </div>
      <p class="add-button" @click="handleAdd">
        <img :src="plusIcon" /><span>Thêm công ty</span>
      </p>
    </form>
  </div>
</template>

<script>
import InputItem from "../OverForm/InputItem.vue";
import TextArea from "./TextArea.vue";
import trashIcon from "../../assets/Image/trash.png";
import plusIcon from "../../assets/Image/plus.png";
import SelectCity from "./SelectCity.vue";
import { company } from "../../data/data";
export default {
  name: "SecondForm",
  data() {
    return {
      companyList: [
        {
          id: 1,
          company: "",
          poisition: "",
          start_date: "",
          end_date: "",
          description: "",
        },
      ],
      error: {
        REQUIRED_NOTI: "This field is not empty!",
        INP_LENGTH: "Over 100 characters!",
      },
      checkStatus: {
        isEmpty: false,
        isDate: false,
      },
      checkExpCount: false,
      trashIcon,
      plusIcon,
      company,
      isDisable: false,
    };
  },
  components: { InputItem, TextArea, SelectCity },
  methods: {
    handleAdd() {
      let uniqueKey = Math.random().toString(36).substring(2);
      this.companyList.push({
        id: uniqueKey,
        company: "",
        poisition: "",
        start_date: "",
        end_date: "",
        description: "",
      });
      this.checkExpCount = false;
      this.$store.commit("SET_SECOND_FORM", this.companyList);
    },
    handleDelete(index) {
      let i = this.companyList.map((item) => item.id).indexOf(index);
      if (this.companyList.length > 1) {
        this.companyList.splice(i, 1);
        this.checkExpCount = false;
      } else {
        this.checkExpCount = true;
      }
    },
    handleFocusInput(item) {
      if (!item.poisition.length) {
        this.checkStatus.isEmpty = true;
        console.log(this.checkStatus.isEmpty);
      } else {
        this.checkStatus.isEmpty = false;
      }
    },
    checkDateExp(item) {
      let startDate = new Date(item.start_date);
      let endDate = new Date(item.end_date);
      if (startDate >= endDate) {
        this.checkStatus.isDate = true;
      } else {
        this.checkStatus.isDate = false;
      }
    },
    checkButton() {
      if (this.checkStatus.isEmpty || this.checkStatus.isDate) {
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }
      this.$store.commit("SET_DISABLE", this.isDisable);
    },
  },
};
</script>

<style scoped>
#second-form {
  width: 932px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.form-group {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 24px 24px 38px 24px;
  margin-bottom: 28px;
}
.form-group .select-box {
  display: flex;
  background: #f8f8f8;
  border-radius: 4px;
  margin-bottom: 24px;
}
.form-group .select-box select {
  flex: 80%;
  padding: 8px 10px;
  margin: 10px 0 10px 10px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
}
.form-group .select-box select:focus {
  outline: none;
}
.form-group .select-box button {
  padding: 14px;
  border: none;
  background: #f8f8f8;
}
.add-button {
  display: flex;
  flex-direction: row;
  width: 151px;
  font-size: 16px;
  padding: 8px 8px 8px 0;
  margin: 20px 0 24px 0;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
}
.add-button span {
  font-size: 16px;
  line-height: 24px;
  color: #48647f;
}
.add-button img {
  padding: 0 8px;
}
.select-box .input-item {
  width: 898px;
  justify-content: center;
  margin-left: 16px;
  margin-bottom: 0;
}
.input-time:before {
  content: "";
  position: absolute;
  width: 11px;
  border: 1px solid #bdbdbd;
  left: 135px;
}
.warning-box{
  border-color:red
}
.warning input[type="date"] {
  border-color: red;
}
p {
  text-align: start;
  margin-bottom: 10px;
}
p.warning {
  color: red;
}
</style>
slice
