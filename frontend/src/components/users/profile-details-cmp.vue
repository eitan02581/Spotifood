<template>
  <section class="main-container">
    <div class="img-container">
      <img v-if="user.img || !isMyUserProfile" :src="imgSrc" alt>
      <div v-else-if="isMyUserProfile" class="upload-container">
        <el-upload
          v-if="!isUploading"
          class="avatar-uploader"
          action="squeeze rubber duck"
          :http-request="uploadImg"
          :show-file-list="false"
        >
          <div class="upload-icon" v-if="isUploading">
            <i class="el-icon-loading"></i>
          </div>
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="loading" v-else>
          <i class="el-icon-loading"></i>
        </div>
      </div>
    </div>
    <profile-Info :user="user" :showInput="showInput" @closeInput="closeInput"/>
    <profile-experience
      :user="user"
      :groups="sortedGroups"
      :isMyUserProfile="isMyUserProfile"
      @editCuisine="editCuisine"
    />
  </section>
</template>

<script>
import profileInfo from "./profile-info-cmp";
import profileExperience from "./profile-experience-cmp";
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    groups: {
      type: Array,
      required: true
    },
    isMyUserProfile: {
      type: Boolean,
      required: true
    }
  },
  components: {
    profileInfo,
    profileExperience
  },
  data() {
    return {
      showInput: false,
      isUploading: false
    };
  },
  computed: {
    sortedGroups() {
      return this.groups.sort((a, b) => a.time - b.time);
    },
    imgSrc() {
      return this.user.img
        ? this.user.img
        : "http://res.cloudinary.com/sprint4-weat/image/upload/v1553679542/demo/hueavks6ncdlxxp22fnn.jpg";
    }
  },
  methods: {
    editCuisine() {
      this.showInput = true;
    },
    closeInput() {
      this.showInput = false;
    },
    uploadImg(input) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append("file", input.file);
      this.$store.dispatch({ type: "uploadImg", img: formData }).then(url => {
        debugger;
        this.user.img = url;
        this.isUploading = false;
      });
    }
  }
};
</script>

<style lang=scss>
.main-container {
  display: flex;
  width: 100%;
  max-height: 600px;
  margin-bottom: 50px;
  padding-top: 100px;
  & > * {
    padding: 10px;
  }
  .img-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    width: 33%;
    height: 100%;
    min-height: 400px;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
    }
  }
  .upload-container {
    min-height: 400px;
  }

  .avatar-uploader {
    border: 1px dashed #409eff;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
  }
  .upload-icon {
    text-align: center;
    font-size: 2em;
  }
}
</style>
