<template>
  <section class="events-list">
    <template v-if="groups.length">
      <event-preview v-for="group in groups" :key="group._id" :group="group" @SetOnMap="SetOnMap"/>
    </template>
    <template v-else>
      <h2>No Groups Yet...</h2>
      <router-link to="/groups">
        Find Groups!
        <i class="fas fa-arrow-circle-right"></i>
      </router-link>
    </template>
  </section>
</template>

<script>
import eventPreview from "./event-Preview-cmp";
export default {
  components: {
    eventPreview
  },
  props: {
    groups: {
      type: Array,
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    SetOnMap(loc) {
      this.$emit("SetOnMap", loc);
    }
  },
  created() {}
};
</script>

<style lang=scss scoped>
.events-list {
  display: flex;
  height: 120px;
  max-height: 600px;
  width: 100%;
  overflow: scroll;
  h2,
  a {
    margin: 10px;
    color: #424242;
    font-size: 1.5em;
  }
}
@media (min-width: 600px) {
  .events-list {
    display: block;
    width: 250px;
    height: 70vh;
  }
}
</style>
