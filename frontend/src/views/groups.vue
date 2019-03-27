<template>
  <section>
    <div data-aos="fade-down" data-aos-duration="900" class="filter-container">
      <FilterGroup @filter="filter"></FilterGroup>
    </div>
    <LoadingCmp v-if="!loadedGroups"></LoadingCmp>
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
section {
  padding-top: 50px;

  display: flex;
  // align-items: baseline;
  flex-direction: column;

  .filter-container {
    // margin-top: 37px;
    margin-top: -63px;

    position: fixed;
    z-index: 111;
    background-color: white;
    padding: 20px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }
  .group-list-container {
    margin-top: 50px;
  }
}
</style>
