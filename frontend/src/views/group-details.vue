<template>
  <section class="group-details">
    <h1>Group Details</h1>
    <details-aside :usersCard="usersCard" :groupsCard="groupsCard"/>
  </section>
</template>

<script>
import detailsAside from "../components/groups/group-aside-cmp.vue";

export default {
  data() {
    return {
      usersCard: [{title:"user1",img:''}, "user2", "user3"],
      groupsCard: ["group1", "group2", "group3"]
    };
  },
  created() {
    console.log(this.$route.params.groupId);
  },
  components: {
    detailsAside
  }
};
</script>

<style>
.group-details {
  height: calc(100vh - 130px - 100px);
}
</style>
