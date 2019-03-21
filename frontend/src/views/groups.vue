<template>
  <section>
    
    <div class="filter-container">
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
  display: flex;
  align-items: baseline;

  .filter-container {
    margin-top: 200px;
    background-color: beige;
    padding: 20px;
    // height: 80px;
    transition: 0.3s;
  }
}
</style>
