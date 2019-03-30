<template>
  <section class="main-container">
    <profile-card :user="user" :isMyUserProfile="isMyUserProfile"/>
    <h1>My Events</h1>
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

<style scoped lang=scss>
.main-container {
  margin: auto;
  min-height: 50vh;
}
h1 {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: rgb(99, 99, 99);
  font-size: 3rem;
  text-transform: uppercase;
  margin: 50px 0 20px;
}

@media (min-width: 650px) {
  .main-container {
    max-width: 80%;
  }
}
@media (min-width: 350px) {
  .main-container {
    border: 1px solid rgb(199, 199, 199);
  }
}
</style>
