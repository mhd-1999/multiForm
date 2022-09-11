<template>
  <div id="drop-zone">
    <label>{{ label }}</label>
    <div
      id="drop-zone-content"
      @dragenter="isActive = true"
      @mouseleave="isActive = false"
      @drop.prevent="handleChangeImage"
      @dragover.prevent
      v-show="!imageSrc"
      :class="{ 'active-dropzone': isActive }"
    >
      <img :src="uploadIcon" alt="" />
      <p>Hãy kéo và thả ảnh vào đây hoặc</p>
      <label for="select-file">nhấn vào đây</label>
      <input
        accept="image/*"
        id="select-file"
        type="file"
        @change="handleChangeImage"
      />
    </div>
    <div class="img-preview" @click="handleRemoveImage">
      <img :src="imageSrc" />
    </div>
  </div>
</template>

<script>
import uploadIcon from "../../assets/Image/upload.png";
export default {
  name: "DropZone",
  props: {
    label: String,
    imageSrc:String,
  },
  data() {
    return {
      uploadIcon: uploadIcon,
      isActive: false,
      image: "",
    };
  },
  methods: {
    handleChangeImage(e) {
      this.$emit("handleChangeImage",e);
    },
    handleRemoveImage() {
      this.$emit("handleRemoveImage");
    },
  },
};
</script>

<style scoped>
#drop-zone {
  width: 100%;
  display: flex;
  text-align: start;
  flex-direction: column;
}
#drop-zone label {
  flex: 100%;
}
#drop-zone-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #f8f8f8;
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  padding: 48px 0;
}
#drop-zone-content img {
  width: 32px;
  height: 32px;
  margin: 0 auto;
}
#drop-zone-content p {
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  margin-top: 16px;
}
#drop-zone-content label {
  text-decoration: underline;
  font-size: 18px;
  line-height: 22px;
}
#drop-zone-content input {
  display: none;
}
.active-dropzone {
  opacity: 0.5;
  border: 1px dashed #000000 !important;
}
.img-preview {
  width: 200px;
}
.img-preview img {
  width: 100%;
  border-radius: 7px;
}
</style>
