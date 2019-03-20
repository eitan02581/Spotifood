<template>
  <div id="app">
    <navBar></navBar>
    <router-view></router-view>
  </div>
</template>
<script>
import navBar from "./components/navBar-cmp";
export default {
  components: {
    navBar
  }
};
</script>

<style lang="scss">
</style>
