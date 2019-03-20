<template>
  <section>
    <h1>Explore Groups</h1>
    <GroupList :groups="groups"></GroupList>
  </section>
</template>

<script>
import GroupList from "../components/groups/group-list-cmp";
import groupStore from "../store/group-store.js";

export default {
  components: {
    GroupList
  },
  created() {
    this.$store.dispatch({ type: "getGroups" });
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    }
  }
};
</script>

<style>
</style>
