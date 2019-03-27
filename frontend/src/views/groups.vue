<template>
  <section>
    <div data-aos="fade-down" data-aos-duration="900" class="filter-container">
      <FilterGroup @filter="filter"></FilterGroup>
    </div>
    <div class="group-list-container">
      <GroupList :groups="groups"></GroupList>
    </div>
  </section>
</template>

<script>
import GroupList from "../components/groups/group-list-cmp";
import groupStore from "../store/group-store.js";
import FilterGroup from "../components/groups/filter-cmps/filterGroups-cmp.vue";
export default {
  components: {
    GroupList,
    FilterGroup
  },
  created() {
    this.$store.dispatch({ type: "getGroups" });
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
    margin-top: -70px;
   width: 100%;
    position: fixed;
    z-index: 111;
    background-color: unset;
    padding: 20px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }
  .group-list-container {
    margin-top: 50px;
  }
}
</style>
