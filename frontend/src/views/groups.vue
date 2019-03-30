<template>
  <section>
    <LoadingCmp v-if="!loadedGroups"></LoadingCmp>
    <div v-if="loadedGroups" data-aos="fade-down" data-aos-duration="900" class="filter-container">
      <FilterGroup @filter="filter"></FilterGroup>
    </div>
    <div v-if="nearbyGroups && nearbyGroups.length" class="groups-previews">
      <h1>Come by!</h1>
      <h3>Events Near You</h3>
      <div class="group-container">
        <GroupPreview v-for="group in nearbyGroups" :key="group._id" :group="group"></GroupPreview>
      </div>
      <hr>
    </div>
    <LoadingCmp v-if="!loadedGroups || !nearbyGroups && !nearbyGroups.length"></LoadingCmp>
    <div v-if="loadedGroups" class="group-list-container">
      <h1>Try Something New</h1>
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
      nearbyGroups: null
    };
  },
  created() {
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
          console.log("currLoc", this.currLoc);
          console.log(this.$store.getters.groups);
          let nearby = this.$store.getters.groups.filter(group => {
            let dist = this.getDistanceFromLatLonInKm(
              this.currLoc.lat,
              this.currLoc.lng,
              group.location.lat,
              group.location.lng
            );
            console.log("distance:", dist);
            return dist < 80;
          });
          console.log("nearby groups are", nearby);
          this.nearbyGroups = nearby;
        });
      }
    });
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    }
  },
  methods: {
    filter(filterBy) {
      this.$store.dispatch({ type: "filterGroups", filterBy });
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
    // align-items: baseline;
    flex-direction: column;
    .filter-container {
      // margin-top: 37px;
      margin-top: -70px;
      width: 100%;
      position: fixed;
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
  // justify-content: center;
}
.groups-previews {
  margin: 100px auto 0;
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
