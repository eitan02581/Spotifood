<template>
  <section>
    <!-- data-aos="fade-down" data-aos-duration="900" -->
    <!-- <LoadingCmp v-if="!loadedGroups"></LoadingCmp> -->
    <LoadingCmp v-if="!loadedGroups || !nearbyGroups && !nearbyGroups.length"></LoadingCmp>
    <div v-if="loadedGroups" data-aos="fade-down" data-aos-duration="900" class="filter-container">
      <FilterGroup @filter="filter"></FilterGroup>
    </div>
    <LoadingCmp v-if="!loadedGroups || !nearbyGroups.length"></LoadingCmp>
    <div v-if="loadedGroups" class="group-list-container">
      <!-- <div v-if="nearbyGroups.length" class="groups-previews">
        <h1>Come by!</h1>
        <h3>Events Near You</h3>
        <div class="group-container">
          <GroupPreview v-for="group in nearbyGroups" :key="group._id" :group="group">
            <template v-slot:comming-up>{{group.dist}} km Away</template>
          </GroupPreview>
        </div>
        <hr>
      </div>-->
      <h1 v-if="filterTitleToDisp">
        Check Out
        <span :style="{color: '#' + filterTitleToDisp.color}">{{homeFilterTitle}}</span>
        <a @click="clearFilter">Clear Style</a>
      </h1>
      <h1 v-else>Try Something New</h1>
      <GroupList :groups="groups"></GroupList>
    </div>
  </section>
</template>

<script>
import GroupList from "../components/groups/group-list-cmp";
import groupStore from "../store/group-store.js";
import FilterGroup from "../components/groups/filter-cmps/filterGroups-cmp.vue";
import LoadingCmp from "../components/loading-cmp.vue";
import GroupPreview from "../components/groups/group-preview-cmp";

export default {
  components: {
    LoadingCmp,
    GroupList,
    FilterGroup,
    GroupPreview
  },
  data() {
    return {
      loadedGroups: false,
      currLoc: null,
      nearbyGroups: [],
      filterTitleToDisp: null
    };
  },
  created() {
    this.filterTitleToDisp = this.$store.getters.getHomePageFitler;
    this.$store.dispatch({ type: "getGroups" }).then(() => {
      setTimeout(() => {
        this.loadedGroups = true;
      }, 1000);
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
    });
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    },
    homeFilterTitle() {
      return this.filterTitleToDisp.filterBy === "eventType"
        ? " some Cool " + this.filterTitleToDisp.val
        : this.filterTitleToDisp.val + " style";
    }
  },
  methods: {
    filter(filterBy) {
      // check if it is from homepage
      this.filterTitleToDisp = this.$store.getters.getHomePageFitler;
      this.$store.dispatch({ type: "filterGroups", filterBy });
    },
    clearFilter() {
      this.$store.commit("clearFilter");
      this.$store.dispatch({ type: "filterGroups", filterBy: null });
      this.filterTitleToDisp = this.$store.getters.getHomePageFitler;
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
  }
};
</script>

<style scoped lang="scss">
@media only screen and (min-width: 600px) {
  section {
    flex-grow: 1;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    .filter-container {
      position: fixed;
      margin-top: -70px;
      width: 100%;
      z-index: 111;
      background-color: unset;
      padding: 20px;
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
  }
}
section {
  .group-list-container {
    margin-top: 50px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 30px 0 30px;
    text-align: center;
    margin-bottom: 50px;
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
}
.groups-previews {
  margin: 50px auto 0;
}
hr {
  border: 0;
  height: 0;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
h1 {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: rgb(99, 99, 99);
  font-size: 3rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    margin-left: 40px;
    opacity: 0.7;
    padding: 10px;
    background-color: white;
    font-size: 0.4em;
    border-radius: 7px;
    color: #cc1616;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
}
h3 {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: rgb(99, 99, 99);
}

@media only screen and (max-width: 600px) {
  section {
    width: 100%;
    flex-grow: 1;
  }
}
</style>
