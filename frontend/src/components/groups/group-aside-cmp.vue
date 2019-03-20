<template>
  <section class="group-aside">
    <aside-list :cards="usersCard"/>
    <hr>
    <aside-list :cards="groupsCard"/>
  </section>
</template>

<script>
import asideList from "./aside-list-cmp";

export default {
  props: {
    userCards: array,
    groupsCards: array
  },
  components: {
    asideList
  },
  data() {
    return {
    };
  },
  created() {}
};
</script>

<style scoped>
.group-aside {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 3vw;
  top: 20vh;
  height: 75vh;
  width: 20vw;
  background-color: aquamarine;
}
hr {
  margin: 0;
  padding: 0;
}
</style>
