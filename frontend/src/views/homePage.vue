<template>
  <section>
    <div class="video-container">
      <Landing-video></Landing-video>
    </div>
    <div class="back">
      <div class="main-content">
        <div class="how-it-works">
          <HowItWorks></HowItWorks>
        </div>
        <div class="groups-previews">
          <!-- <hr> -->
          <h1>Breakfast</h1>
          <div class="group-container">
            <GroupPreview v-for="group in breakfastGroups" :key="group._id" :group="group"></GroupPreview>
            <!-- <GroupList :groups="groups"></GroupList> -->
          </div>
          <!-- <hr> -->
          <h1>Lunch</h1>
          <div class="group-container">
            <GroupPreview v-for="group in lunchGroups" :key="group._id" :group="group"></GroupPreview>
            <!-- <GroupList :groups="groups"></GroupList> -->
          </div>
          <!-- <hr> -->
          <h1>Dinner</h1>
          <div class="group-container">
            <GroupPreview v-for="group in dinnerGroups" :key="group._id" :group="group"></GroupPreview>
            <!-- <GroupList :groups="groups"></GroupList> -->
          </div>
        </div>
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
      dinnerGroups: null,
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
  flex-grow: 1;

  // width: 100%;
  // margin-top: -100px;
  // min-height: 100vh;
  .video-container {
    position: fixed;
    width: 100%;
  }
  .back {
    background-color: #f6f6f6;
    height: 100%;
    position: relative;
  }
  .main-content {
    padding-bottom: 50px;

    max-width: 1200px;
    margin: 0 auto;
    padding: 90px 30px 0 30px;

    margin-top: 100vh;
    position: relative;
    background: #f6f6f6;
  }
  .group-container {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin-bottom: 50px;
    display: flex;
    position: relative;
    transition: 0.3s;

    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    // justify-content: center;
  }

  .group-container:hover {
    border-top: 1px solid #7f7a7a28;
    border-bottom: 1px solid #7f7a7a40;
  }
  .groups-previews {
    h1 {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      color: rgb(99, 99, 99);
      font-size: 2rem;
      letter-spacing: 0.4rem;
      text-transform: uppercase;
      // margin-left: 10%;
      margin-bottom: 3%;
      padding-left: 6px;
      position: relative;
      left: 0;
    }
  }
  .how-it-works {
    // margin-top: 50px;
    margin-bottom: 50px;
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
