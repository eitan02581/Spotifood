<template>
  <section class="profile-events-container">
    <events-list :groups="groups" @SetOnMap="SetOnMap"/>
    <div class="map-container">
      <img v-if="!mapLoaded" src="@/assets/loading_imgs/map.gif" alt="map_loading">
      <gmap-map v-if="mapLoaded" :center="mapCenter" :zoom="7">
        <template v-if="groups.length">
          <gmap-marker v-for="group in groups" :key="group._id" :position="group.location"></gmap-marker>
        </template>
      </gmap-map>
    </div>
  </section>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import eventsList from "./events-list-cmp";
export default {
  components: {
    eventsList
  },
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedEventLoc: null,
      mapLoaded: false
    };
  },
  computed: {
    mapCenter() {
      return this.groups.length ? this.selectedEventLoc : { lat: 31, lng: 31 };
    }
  },
  methods: {
    SetOnMap(loc) {
      this.selectedEventLoc = loc;
    }
  },
  created() {
    setTimeout(() => {
      this.mapLoaded = true;
      if (this.groups.length) {
        this.selectedEventLoc = this.groups[0].location;
      }
    }, 1500);
  }
};
</script>

<style scoped lang="scss">
.profile-events-container {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
}
.map-container {
  display: block;
  height: 70vh;
  max-height: 600px;
  width: 100%;
  .vue-map-container {
    height: 100%;
  }
}
@media (min-width: 600px) {
  .profile-events-container {
    width: 90%;
    margin: 0 auto 50px;
    flex-direction: row;
  }
  .map-container {
    width: calc(100% - 250px);
  }
}
@media (max-width: 350px) {
  .profile-events-container {
    margin: 15px auto;
    width: 100%;
  }
}
</style>
