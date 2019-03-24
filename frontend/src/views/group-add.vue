<template>
  <section class="add-group-form">
    <el-form class="form-text-input" ref="group" label-width="120px">
      <!-- Form Label -->
      <el-form-item>
        <h1>Create Group</h1>
      </el-form-item>
      <!-- Group Name Input -->
      <el-form-item label="Group Name">
        <el-input v-model="group.title"></el-input>
      </el-form-item>
      <!-- Group Time Input -->
      <el-form-item label="Meal time">
        <el-date-picker
          v-model="group.time"
          type="datetime"
          value-format="timestamp"
          placeholder="Select date and time"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <!-- UPLOAD PROFILE IMG -->
        <el-upload
          class="avatar-uploader"
          action="squeeze rubber duck"
          :http-request="uploadImg"
          :show-file-list="false"
        >
          <!-- :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"-->
          <img v-if="group.img" :src="group.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="Guests">
        <el-input-number v-model="group.guests" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="Event Type">
        <el-select v-model="group.eventType" filterable placeholder="Select Event">
          <el-option v-for="event in eventType" :key="event" :label="event" :value="event"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Cuisine Type">
        <el-select multiple v-model="group.cuisineType" filterable placeholder="Select Cuisine">
          <el-option
            v-for="cuisine in cuisineType"
            :key="cuisine"
            :label="cuisine"
            :value="cuisine"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="Tags">
        <el-select
          v-model="group.hashtags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Add Tags"
        >
        </el-select>
        <button v-if="value10.length >=1" @click="clearSelect" class="delete">X</button>
      </el-form-item> -->
      <el-form-item label="Location">
        <GmapAutocomplete class="el-input__inner" @place_changed="setPlace"></GmapAutocomplete>
      </el-form-item>
      <div class="map-container">
        <img v-if="!currLoc" src="@/assets/loading_imgs/map.gif" alt="map_loading">
        <GmapMap v-if="currLoc" :center="currLoc" :zoom="10" ref="groupMap" style="flex-grow: 1">
          <GmapMarker :position="markerPos" :clickable="true" :draggable="true"/>
        </GmapMap>
      </div>
    </el-form>
    <div class="btns">
      <el-button type="primary" @click="createGroup">Create</el-button>
      <el-button @click="cancelGroup">Cancel</el-button>
    </div>
  </section>
</template>

<script>
import FunctionalCalendar from "vue-functional-calendar";
import GroupService from "../services/GroupService.js";
import uploadService from "../services/UploadService";
import { gmapApi } from "vue2-google-maps";
import moment from "moment";

export default {
  components: {
    FunctionalCalendar
  },
  data() {
    return {
      searchInput: "",
      currLoc: null,
      markerPos: null,
      group: {
        title: "",
        location: null,
        time: null,
        place: null,
        cuisineType: [],
        guests: 1,
        eventType: "",
        img: "",
        hashtags: []
      },
      cuisineType: [
        "Israeli",
        "French",
        "Italian",
        "British",
        "Vietnamese",
        "Chinese",
        "Indian",
        "Other"
      ],
      eventType: ["Breakfast", "Brunch", "Lunch", "Dinner", "Other"]
    };
  },
  created() {
    if (navigator.geolocation) {
      console.log("created");
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(this.setUserLocation);
      }, 1500);
    }
  },
  computed: {
    google: gmapApi
  },
  methods: {
    cancelGroup() {
      this.$router.push("/");
    },
    setUserLocation(position) {
      console.log("user location is", position);
      this.currLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.markerPos = this.currLoc;
    },
    getLatLngFromEvent(event) {
      return {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    },
    setPlace(place) {
      if (Object.keys(place).length < 2) {
        console.log(Object.keys(place).length);
        return;
      }
      console.log(place);
      this.group.location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.$refs.groupMap.panTo(this.group.location);
      this.markerPos = this.group.location;
      let country = place.address_components.find(
        adr => adr.types[0] === "country"
      );
      country = {
        longName: country.long_name,
        shortName: country.short_name
      };
      let city = place.address_components.find(
        adr => adr.types[0] === "locality"
      );
      this.group.place = {
        country,
        city: city.long_name
      };
    },
    isInValid() {
      let vals = Object.values(this.group);
      let emptyVal = vals.findIndex(val => !val);

      return emptyVal !== -1 || !this.group.cuisineType.length;
    },
    async createGroup() {
      if (!this.group.img) {
        this.group.img = "https://picsum.photos/200/300/?random";
      }
      if (this.isInValid()) return;
      let admin = this.$store.getters.user;
      this.group.admin = admin._id;
      console.log("group to add with admin");
      try {
        const newGroup = await this.$store.dispatch("addGroup", {
          group: this.group
        });
        this.$router.push("/groups/" + newGroup._id);
      } catch (e) {
        console.log(e);
      }
    },
    uploadImg(input) {
      console.log(input.file);
      const formData = new FormData();
      formData.append("file", input.file);
      uploadService.uploadImg(formData).then(url => {
        console.log(url);
        this.group.img = url;
        console.log(this.group.img); //// TODO: show success popup
      });
    }
    ////////////////////////////////
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //
    //   if (!isJPG) {
    //     this.$message.error("Avatar picture must be JPG format!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("Avatar picture size can not exceed 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
section {
  width: 80%;
  margin: 10px auto;
  padding: 20px 5px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  .form-text-input {
    h1 {
      justify-self: flex-start;
      font-size: 45px;
      margin: 10px;
    }
    min-width: 200px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .map-container {
    width: 500px;
    margin: 5px;
  }
  .vue-map-container {
    border: 1px solid rgb(219, 219, 219);
    width: 400px;
    // max-width: 400px;
    min-height: 400px;
    flex-grow: 1;
  }
  .btns {
    margin-left: 50px;
    align-self: flex-end;
    justify-self: flex-start;
  }
}
</style>
