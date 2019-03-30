<template>
  <section>
    <LoadingCmp v-if="!loadedGroups"></LoadingCmp>
    <div v-if="loadedGroups" data-aos="fade-down" data-aos-duration="900" class="filter-container">
      <FilterGroup @filter="filter"></FilterGroup>
    </div>
    <div v-if="loadedGroups" class="group-list-container">
      <GroupList :groups="groups"></GroupList>
    </div>
  </section>
</template>

<script>
import GroupList from "../components/groups/group-list-cmp";
import groupStore from "../store/group-store.js";
import FilterGroup from "../components/groups/filter-cmps/filterGroups-cmp.vue";
import LoadingCmp from "../components/loading-cmp.vue";

export default {
  components: {
    LoadingCmp,
    GroupList,
    FilterGroup
  },
  data() {
    return {
      loadedGroups: false
    };
  },
  created() {
    this.$store.dispatch({ type: "getGroups" }).then(() => {
      setTimeout(() => {
        this.loadedGroups = true;
      }, 1000);
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
    }
  }
};
</script>

<style scoped lang="scss">
@media only screen and (min-width: 600px) {
  section {
    flex-grow: 1;

    padding-top: 50px;

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
    padding: 90px 30px 0 30px;
    text-align: center;
    margin-bottom: 50px;
  }
}

@media only screen and (max-width: 600px) {
  section {
    width: 100%;
    flex-grow: 1;
  }
}
</style>
