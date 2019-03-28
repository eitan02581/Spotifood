<template>
  <section class="profile-info">
    <!-- IMAGE OR UPLOAD IMAGE -->
    <div class="profile-img">
      <div v-if="user.img === noImgUrl && isMyUserProfile"  class="upload-container">
        <el-upload
          v-if="!isUploading"
          class="avatar-uploader"
          action="squeeze rubber duck"
          :http-request="uploadImg"
          :show-file-list="false"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="loading" v-else>
          <i class="el-icon-loading"></i>
        </div>
      </div>
      <img v-else :src="user.img" alt>
    </div>
    <!-- SOCIAL ICONS -->
    <div class="social-icons">
      <i class="fab fa-facebook-f"></i>
      <i class="fab fa-twitter"></i>
      <i class="fab fa-instagram"></i>
    </div>
    <!-- PROFILE NAME -->
    <h2>Hi, Im {{user.username}}</h2>
    <!-- PROFILE LOCATION -->
    <h3>From {{user.city}}, {{user.country}}</h3>
    <!-- PROFILE FAVORITE CUISINES -->
    <div class="cuisines">
      <h3>Cuisines:</h3>
      <ul>
        <li v-for="countryUrl in countriesFlags" :key="countryUrl">
          <img :src="countryUrl">
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    isMyUserProfile: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isUploading: false,
      noImgUrl:'http://res.cloudinary.com/sprint4-weat/image/upload/v1553679542/demo/hueavks6ncdlxxp22fnn.jpg'
    };
  },
  computed: {
    imgSrc() {
      return this.user.img !== this.noImgUrl
        ? this.user.img
        : noImgUrl
    },
    countriesFlags() {
      return this.user.favCategories.map(category => {
        switch (category) {
          case "British":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553532475/demo/eebgewy30zwm0nauyift.png";
          case "American":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553532519/demo/huhedgc4ziopzei1fxed.png";
          case "Chinese":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553532383/demo/vs51q9wpjurnjdr3jgtk.png";
          case "Vegan":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604325/demo/yiqc4rpj6amsdb4sxfm1.png";
          case "French":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604377/demo/iuqym1xcmag0qivg76qk.png";
          case "Indian":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604410/demo/hh4m1bjiyt95wg1nrwj0.png";
          case "Italian":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604440/demo/bwmszyygti1j44iaklxe.png";
          case "Israeli":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604468/demo/vey7zynb2msqr5p4ntlh.png";
          case "Vietnamese":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604700/demo/tpbcpaqyquiygqozek52.png";
          default:
            return;
        }
      });
    }
  },
  methods: {
    uploadImg(input) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append("file", input.file);

      this.$store
        .dispatch({ type: "uploadImg", img: formData, userId: this.user._id })
        .then(url => {
          debugger;
          this.user.img = url;
          this.isUploading = false;
        });
    }
  }
};
</script>

<style lang=scss scoped>
.profile-info {
  background-color: #f6f6f6;
  margin: -25% auto 0 auto;
  position: relative;
  width: 100%;
  border: 2px solid gray;

  & > * {
    padding: 10px 15px;
  }

  .profile-img {
    width: 200px;
    margin: 0 auto;
    img,
    .upload-container {
      border-radius: 50%;
      width: 175px;
      height: 175px;
      object-fit: cover;
    }
    .upload-container {
      border: 1px dotted;
      i {
        width: 175px;
        height: 175px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:hover {
        color: gray;
        cursor: pointer;
      }
    }
  }
}

h3 {
  color: #757575;
}

.social-icons {
  font-size: 1.5em;
  display: flex;
  justify-content: space-around;
  & > i:hover {
    color: cyan;
  }
}

.cuisines {
  ul {
    padding-left: 0;
    margin-top: 10px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    & > li > img {
      width: 30px;
      height: 30px;
    }
    li {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .fa-edit:hover {
    color: gray;
  }
}
@media(min-width: 350px){
  .profile-info{
    width: 250px;
  }
}
</style>
