<template>
  <section>
    <div class="video-container">
      <Landing-video></Landing-video>
    </div>
    <div class="how-it-works">
      <HowItWorks></HowItWorks>
    </div>
    <div class="groups-previews">
      <hr>
      <h1>Breakfast</h1>
      <div class="group-container">
        <GroupPreview v-for="group in breakfastGroups" :key="group._id" :group="group"></GroupPreview>
        <!-- <GroupList :groups="groups"></GroupList> -->
      </div>
      <hr>
      <h1>Lunch</h1>
      <div class="group-container">
        <GroupPreview v-for="group in lunchGroups" :key="group._id" :group="group"></GroupPreview>
        <!-- <GroupList :groups="groups"></GroupList> -->
      </div>
      <hr>
      <h1>Dinner</h1>
      <div class="group-container">
        <GroupPreview v-for="group in dinnerGroups" :key="group._id" :group="group"></GroupPreview>
        <!-- <GroupList :groups="groups"></GroupList> -->
      </div>
    </div>
  </section>
</template>

<script>
import LandingVideo from "../components/homePage/landing-video-cmp";
import GroupPreview from "../components/groups/group-preview-cmp";
import HowItWorks from "../components/homePage/howItWorks-cmp";
import GroupList from "../components/groups/group-list-cmp";

export default {
  components: {
    LandingVideo,
    GroupPreview,
    HowItWorks,
    GroupList
  },
  data() {
    return {
      breakfastGroups: null,
      lunchGroups: null,
      dinnerGroups: null
    };
  },
  async created() {
    this.$store.dispatch({ type: "getGroups" }).then(() => {
      console.log("all groups are", this.$store.getters.groups);
      this.breakfastGroups = this.$store.getters.groups.filter(
        group => group.eventType === "Breakfast"
      );
      // console.log("lunch groups are:", this.breakfastGroups);
      this.lunchGroups = this.$store.getters.groups.filter(
        group => group.eventType === "Lunch"
      );
      // console.log("lunch groups are:", this.lunchGroups);
      this.dinnerGroups = this.$store.getters.groups.filter(
        group => group.eventType === "Dinner"
      );
      // console.log("lunch groups are:", this.dinnerGroups);
    });
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    }
  }
};
</script>

<style scoped lang="scss">
section {
  // width: 100%;
  // margin-top: -100px;
  // min-height: 100vh;
  h1 {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    color: rgb(99, 99, 99);
    font-size: 2rem;
    letter-spacing: 0.4rem;
    text-transform: uppercase;
    margin-left: 10%;
    margin-bottom: 3%;
  }
  .group-container {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }
  .how-it-works {
    margin-top: 400px;
    margin-bottom: 150px;
  }
  hr {
    border: 0;
    height: 0;
    width: 70%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
}
</style>
