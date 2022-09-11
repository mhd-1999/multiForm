<template>
  <div id="multi-input">
    <label for="">Vị trí làm việc</label>
    <div class="input-field">
      <img :src="searchIcon" alt="" />
      <div class="field-tags">
        <button
          v-for="item in poisitionField"
          :key="item.id"
          @click="handleDeleteTag(item.id)"
        >
          <p>{{ item.name }}</p>
        </button>
      </div>
      <input
        type="text"
        :placeholder="placeHolder"
        :value="searchValue"
        @input="onInputValue"
      />
    </div>
    <div class="tags" v-if="searchValue">
      <p
        v-for="item in fieldTags"
        :key="item.id"
        :value="item.name"
        @click="handleAddTag(item)"
      >
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
import searchIcon from "../../assets/Image/search.png";
export default {
  name: "Multi-Input",
  props: {
    placeHolder: String,
    poisitionField: Array,
    poisition: Array,
    fieldTags: Array,
    searchValue: String,
  },
  data() {
    return {
      searchIcon,
    };
  },
  methods: {
    handleAddTag(item) {
      this.$emit("handleAddTag", item);
    },
    handleDeleteTag(id) {
      this.$emit("handleDeleteTag", id);
    },
    onInputValue(e) {
      let inputText = e.target.value;
      this.$emit("update:valueInput", inputText);
    },
  }, 
  computed: {
    isShow() {
      return this.$store.getters.isShow;
    },
  },
};
</script>

<style scoped>
#multi-input {
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-bottom: 10px;
}
.input-field {
  display: flex;
  width: 528px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
}
.input-field input {
  width: 100%;
  border: none;
  font-size: 12px;
}
.input-field input:focus {
  outline: none;
}
.input-field img {
  padding: 8px 10px;
}
.tags {
  width: 528px;
  background: #f1f5f8;
  color: #486581;
  margin-top: 6px;
  border-radius: 4px;
}
.tags p {
  padding: 8px 10px;
}
.tags p:hover {
  background: #617d98;
  color: white;
}
.field-tags {
  display: flex;
  justify-content: center;
}
.field-tags button {
  width: 70px;
  display: inline-block;
  background: #f0f4f8;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 6px 8px;
  margin: 4px 2px;
  text-align: start;
  color: #627d98;
}
</style>
