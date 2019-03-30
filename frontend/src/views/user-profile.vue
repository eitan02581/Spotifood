<template>
  <section class="profile-container">
    <carousel :per-page="1" :autoplay="true" :autoplayTimeout="10000000" :loop="true">
      <slide v-for="recipe in groups[0].recipes" :key="recipe._id">
        <img :src="recipe.imgs[0]">
      </slide>
    </carousel>

    <profile-details
      :isMyUserProfile="isMyUserProfile"
      :user="user"
      :groups="userGroups"
      v-if="user"
    />
  </section>
</template>

<script>
import profileDetails from "../components/users/profile-details-cmp";
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    profileDetails,
    Carousel,
    Slide
  },
  data() {
    return {
      user: null,
      groups: [],
      managedGroups: [],
      isMyUserProfile: false,
      userRecipes: []
    };
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
  },
  methods: {
    getUserGroups() {
      this.user.groups.forEach(groupId => {
        this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
          this.groups.push(group);
        });
      });

      this.user.createdGroups.forEach(groupId => {
        this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
          this.managedGroups.push(group);
        });
      });
    }
  },
  computed: {
    userGroups() {
      return this.groups.concat(this.managedGroups);
    }
    // userRecipes(){
    //   if (!this.user) return
    //   return this.
    // }
  }
};
</script>

<style scoped lang="scss">
.profile-container {
  padding-top: 75px;
  min-height: calc(100vh - 200px);
  width: 100%;
  margin: 0 auto;
}

.VueCarousel {
  width: 80vw;
  height: 500px;
  margin: 0 auto;
}

.VueCarousel-slide {
  width: 100%;
}

.VueCarousel-pagination {
  margin-top: -70px;
  display: none;
}

img {
  width: 80vw;
  object-fit: cover;
}
</style>
