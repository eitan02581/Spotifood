<template>
  <section>
    <div class="background-container">
      <Landing-imgs></Landing-imgs>
    </div>
    <div class="back">
      <div class="main-content">
        <!-- <div class="how-it-works">
          <HowItWorks></HowItWorks>
        </div>-->
        <div data-aos="fade" data-aos-once="true" data-aos-duration="1000" class="explain-one">
          <div data-aos="fade" class="title">
            <h1>
              Join
              <span style="color:red">WEat</span> Experience
            </h1>
          </div>
          <transition name="scale-in-ver-bottom">
            <img
              id="element"
              src="https://www.galloportugal.com/wp-content/uploads/2019/01/Gallo-sobre-nos-1300x420-2.jpg"
              alt="Table with food "
            >
          </transition>
        </div>
        <div class="groups-previews">
          <h1 v-if="user">My Events</h1>
          <div v-if="user" class="group-container">
            <GroupPreview v-for="group in userGroups" :key="group._id" :group="group"></GroupPreview>
          </div>
          <h1 v-if="soonGroups && soonGroups.length">Comming Up</h1>
          <div v-if="soonGroups && soonGroups.length" class="group-container">
            <GroupPreview v-for="group in soonGroups" :key="group._id" :group="group">
              <template v-slot:comming-up>{{group.time | time }}</template>
            </GroupPreview>
          </div>
          <div
            v-if="nearbyGroups && nearbyGroups.length && !filterTitleToDisp"
            class="groups-previews"
          >
            <h1>Come by!</h1>
            <h3>Events Near You</h3>
            <div class="group-container">
              <GroupPreview v-for="group in nearbyGroups" :key="group._id" :group="group">
                <template v-slot:comming-up>{{group.dist}} km Away</template>
              </GroupPreview>
            </div>
          </div>
        </div>
        <div data-aos="fade" data-aos-once="true" data-aos-duration="1000" class="explain-one">
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
        <div data-aos="fade" data-aos-once="true" data-aos-duration="1000" class="explain-one">
          <div data-aos="fade" class="title opac">
            <h1>
              Sharing Moments
              <span style="color:#f44336; font-size:68px">w</span>ith New Ones
              <!-- <span style="color:#f44336;">&</span> Eat Together -->
            </h1>
          </div>
          <img src="../assets/about/morning.jpg" alt="Table white food ">
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
import LandingImgs from "../components/homePage/landing-images-cmp";
import GroupPreview from "../components/groups/group-preview-cmp";
import HowItWorks from "../components/homePage/howItWorks-cmp";
import GroupList from "../components/groups/group-list-cmp";
import cuisineTypes from "../components/homePage/cuisine-cards-cmp";
import countriesCards from "../components/homePage/countries-cards-cmp";
import { eventBus, FILTER_BY } from "../services/EventBusService.js";

export default {
  components: {
    LandingImgs,
    GroupPreview,
    HowItWorks,
    GroupList,
    cuisineTypes,
    countriesCards
  },
  data() {
    return {
      breakfastGroups: null,
      lunchGroups: null,
      dinnerGroups: null,
      userGroups: null,
      soonGroups: null,
      currLoc: null,
      nearbyGroups: null,
      filterTitleToDisp: null,
      timeDiff: 2674800000
    };
  },
  async created() {
    await this.$store.dispatch({ type: "getGroups" });
    // Filter By Time Of day
    this.breakfastGroups = this.$store.getters.groups
      .filter(group => group.eventType === "Breakfast")
      .slice(0, 7);
    this.lunchGroups = this.$store.getters.groups
      .filter(group => group.eventType === "Lunch")
      .slice(0, 7);
    this.dinnerGroups = this.$store.getters.groups
      .filter(group => group.eventType === "Dinner")
      .slice(0, 7);

    // Filter By Closest Timestamp
    this.soonGroups = this.$store.getters.groups
      .filter(
        group =>
          group.time - new Date().getTime() < this.timeDiff &&
          group.time - new Date().getTime() > 0
      )
      .sort((a, b) => a.time - b.time);

    // Filter By Closest Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.currLoc = {
          lat: coords.latitude,
          lng: coords.longitude
        };
        let nearby = this.$store.getters.groups.filter(group => {
          let dist = this.getDistanceFromLatLonInKm(
            this.currLoc.lat,
            this.currLoc.lng,
            group.location.lat,
            group.location.lng
          );
          group.dist = Math.round(dist);
          return dist < 80;
        });
        nearby.sort((a, b) => a.dist - b.dist);
        this.nearbyGroups = nearby;
      });
    }

    if (this.user) {
      this.userGroups = this.user.createdGroups;
      // .filter(
      //   group => group.admin === this.user._id
      // );
    }
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    onFilter(filterBy, val, color) {
      var filterObj = { filterBy, val, color };
      this.$store.dispatch({ type: "setFilterFromHome", filterObj });
      this.$router.push("/groups");
      setTimeout(() => {
        window.scrollTo(0, 400);
      }, 200);
    },
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
      var dLon = this.deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
  },
  destroyed() {}
};
</script>

<style scoped lang="scss">
section {
  .background-container {
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
    padding: 0 30px;

    margin-top: 100vh;
    position: relative;
    background: #f6f6f6;
    .explain-one {
      margin-bottom: 50px;
      position: relative;
      .title {
        background-color: #0000003d;
        height: 99%;
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
  h3 {
    margin-left: 20px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    color: rgb(99, 99, 99);
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
