<template>
  <section class="group-aside">
    <aside-list :cards="userCards"/>
    <hr>
    <aside-list :cards="groupCards"/>
  </section>
</template>

<script>
import asideList from "./aside-list-cmp";

export default {
  props: ['userCards','groupCards'],
  // {
  //   userCards: array,
  //   groupsCards: array
  // },
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
  left: 1vw;
  height: calc(100vh - 230px);
  width: 20vw;
  background-color: aquamarine;
}
hr {
  margin: 0;
  padding: 0;
}
</style>
