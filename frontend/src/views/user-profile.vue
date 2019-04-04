<template>
  <section class="profile-container">
    <carousel :per-page="1" :autoplay="true" :autoplayTimeout="3000" :loop="true">
      <slide v-for="(backGround,idx) in userBackgrounds" :key="idx">
        <img :src="backGround">
      </slide>
    </carousel>

    <profile-details
      :isMyUserProfile="isMyUserProfile"
      :user="user"
      v-if="user"
    />
      <!-- :groups="userGroups" -->
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
      isMyUserProfile: false,
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
    });
  },
  methods: {
  },
  computed: {
    userBackgrounds() {
      if (!this.user || !this.user.favCategories.length) {
        return [
          "http://res.cloudinary.com/sprint4-weat/image/upload/v1554012913/demo/cz0ngdfqpqxmyv2xpo3p.jpg"
        ];
      }
      var categories = this.$store.getters.categories;
      var covers = this.$store.getters.categoriesBcgImgs;
      return this.user.favCategories.map(category => {
        let idx = categories.findIndex(res => category === res);
        return covers[idx];
      });
    }
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
  width: 100%;
  height: 400px;
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
  width: 100vw;
  object-fit: cover;
  height: 500px;
}

@media (min-width: 650px) {
  img {
    width: 80vw;
  }
  .VueCarousel {
    width: 80vw;
  }
}
</style>
