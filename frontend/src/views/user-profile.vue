<template>
  <section class="profile-container">
    <profile-details :isMyUserProfile="isMyUserProfile" :user="user" :groups="groups" v-if="user"/>
    <!-- <img-carousel :groups="groups"/> -->
    <!-- <div class="group-preview-item"> -->
    <el-carousel
      ref="carousel"
      :interval="600000"
      type="card"
      height="550px"
      arrow="never"
      style="text-align: center;"
    >
      <el-carousel-item :name="`${index}`" v-for="(group,index) in managedGroups" :key="group._id">
        <groupPreview :group="group"/>
      </el-carousel-item>
    </el-carousel>
    <!-- <groupPreview v-for="group in groups" :key="group._id" :group="group"/> -->
    <!-- </div> -->
    <!-- <el-button type="success" @click="$emit('delete' , group._id)">Delete</el-button> -->
    <!-- <router-link :to="'/group/edit/' + group._id">
            <el-button type="danger">Edit</el-button>
    </router-link>-->

    <div class="loading-map">
      <img v-if="!location" src="@/assets/loading_imgs/map.gif" alt="map_loading">
    </div>

    <div v-if="location" class="map-container">
      <gmap-map :center="location" :zoom="7">
        <gmap-marker :position="location"></gmap-marker>
      </gmap-map>
    </div>
    <!-- <h1>Reviews</h1> -->
  </section>
</template>

<script>
import groupPreview from "../components/groups/group-preview-cmp.vue";
import profileDetails from "../components/users/profile-details-cmp";
import imgCarousel from "../components/image-carousel-cmp";
import { gmapApi } from "vue2-google-maps";

export default {
  components: {
    groupPreview,
    profileDetails,
    imgCarousel
  },
  data() {
    return {
      user: null,
      groups: [],
      managedGroups: [],
      isMyUserProfile: false,
      location: null,
      counter: 0,
      mapInterval: null
    };
  },
  computed: {
    google: gmapApi
  },
  created() {
    var userId = this.$route.params.userId;
    this.isMyUserProfile =
      this.$store.getters.user && this.$store.getters.user._id === userId
        ? true
        : false;
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      this.user = user;
      if (user.groups) this.getUserGroups();
    });
    this.mapInterval = setInterval(() => {
      this.setActiveItem(this.counter);
      this.counter++;
    }, 5500);
  },
  methods: {
    getUserGroups() {
      this.user.groups.forEach(groupId => {
        this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
          // if (this.groups.le ngth === 0) this.location = group.location;
          this.groups.push(group);
        });
      });

      this.user.createdGroups.forEach(groupId => {
        this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
          if (this.groups.length === 0) this.location = group.location;
          this.managedGroups.push(group);
        });
      });
    },

    setActiveItem(index) {
      if (index >= this.groups.length) this.counter = 0;
      this.location = this.groups[index].location;
      this.$refs.carousel.setActiveItem(index);
    }
  },
  destroyed() {
    clearInterval(this.mapInterval);
  }
};
</script>

<style scoped lang="scss">
.profile-container {
  // min-width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
}
.loading-map {
  width: 100%;
  justify-content: center;
  display: flex;
}
.map-container {
  margin-bottom: 100px;
  // background-color: lightsteelblue;
  width: 100%;
  height: 300px;
  .vue-map-container {
    height: 100%;
  }
}
</style>
