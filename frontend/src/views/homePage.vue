<template>
  <section>
    <div class="video-container">
      <Landing-video></Landing-video>
    </div>
    <div class="back">
      <div class="main-content">
        <!-- <div class="how-it-works">
          <HowItWorks></HowItWorks>
        </div>-->
        <div data-aos="fade" data-aos-once="true" class="explain-one">
          <div data-aos="fade" class="title">
            <h1>
              Cook
              <span style="color:#f44336;">&</span> Eat Together
            </h1>
          </div>
          <transition name="scale-in-ver-bottom">
            <img
              src="https://www.galloportugal.com/wp-content/uploads/2019/01/Gallo-sobre-nos-1300x420-2.jpg"
              alt="Table white food "
            >
          </transition>
        </div>
        <div data-aos="fade" data-aos-once="true" class="explain-one">
          <div data-aos="fade" class="title">
            <h1>Discovering</h1>
            <h1>new flavours</h1>
          </div>
          <img
            src="https://www.galloportugal.com/wp-content/uploads/2018/11/shutterstock_476812717.jpg"
            alt="Table white food "
          >
        </div>
        <div class="cusine-previews">
          <cuisineTypes @filterBy="onFilter"></cuisineTypes>
        </div>

        <div class="groups-previews">
          <div class="br-wrap">
            <h1 @click="onFilter( 'eventType', 'Breakfast')">Breakfast</h1>
            <div class="group-container br-con">
              <GroupPreview v-for="group in breakfastGroups" :key="group._id" :group="group"></GroupPreview>
              <!-- <GroupList :groups="groups"></GroupList> -->
            </div>
          </div>
          <!-- <hr> -->
          <div class="ln-wrap">
            <h1 @click="onFilter( 'eventType', 'Lunch')">Lunch</h1>
            <div class="group-container">
              <GroupPreview v-for="group in lunchGroups" :key="group._id" :group="group"></GroupPreview>
              <!-- <GroupList :groups="groups"></GroupList> -->
            </div>
          </div>
          <!-- <hr> -->
          <div class="din-wrap">
            <h1 @click="onFilter( 'eventType', 'Dinner')">Dinner</h1>
            <div class="group-container">
              <GroupPreview v-for="group in dinnerGroups" :key="group._id" :group="group"></GroupPreview>
              <!-- <GroupList :groups="groups"></GroupList> -->
            </div>
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
import cuisineTypes from "../components/homePage/cuisine-cards-cmp";
import { eventBus, FILTER_BY } from "../services/EventBusService.js";

export default {
  components: {
    LandingVideo,
    GroupPreview,
    HowItWorks,
    GroupList,
    cuisineTypes
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
      // console.log("all groups are", this.$store.getters.groups);
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
  },
  methods: {
    onFilter(filterBy, val) {
      var filterObj = { filterBy, val };
      this.$store.dispatch({ type: "setFilterFromHome", filterObj });
      this.$router.push("/groups");
    }
  },
  destroyed() {}
};
</script>

<style scoped lang="scss">
section {
  flex-grow: 1;

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
    .explain-one {
      margin-bottom: 50px;
      position: relative;
      .title {
        height: 100%;
        width: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
          opacity: 1;
          text-align: center;
          font-size: 30px;
          color: white;
          cursor: default;
          letter-spacing: 4px;
        }
      }
      img {
        height: 300px;
        opacity: 1;
        width: 100%;
        object-fit: cover;
      }
      width: 100%;
    }
  }
  .br-wrap:hover,
  .ln-wrap:hover,
  .din-wrap:hover {
    h1 {
      color: orangered;
    }
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
      cursor: pointer;
      left: 0;
      transition: 0.3s;
    }
  }
  .how-it-works {
    margin-bottom: 50px;
  }
  hr {
    border: 0;
    height: 0;
    width: 70%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .cusine-previews {
    margin-bottom: 50px;
  }
}

@media only screen and (min-width: 600px) {
  .title {
    h1 {
      font-size: 45px !important ;
    }
  }
}
</style>
