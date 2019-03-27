<template>
  <section class="main-container">
    <profile-card :user="user" :isMyUserProfile="isMyUserProfile"/>
    <events-container :groups="sortedGroups"/>
  </section>
</template>

<script>
import profileCard from "./profile-card-cmp";
import eventsContainer from "./profile-events-container-cmp";
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    groups: {
      type: Array,
      required: true
    },
    isMyUserProfile: {
      type: Boolean,
      required: true
    }
  },
  components: {
    profileCard,
    eventsContainer
  },
  data() {
    return {};
  },
  computed: {
    sortedGroups() {
      return this.groups.sort((a, b) => a.time - b.time);
    }
  },
  methods: {}
};
</script>

<style lang=scss>
.main-container {
  margin: auto;
  min-height: 50vh;
}
@media (min-width: 650px) {
  .main-container {
    max-width: 80%;
  }
}
@media (min-width: 350px){
  .main-container{
    border: 1px solid black;
  }
}
</style>
