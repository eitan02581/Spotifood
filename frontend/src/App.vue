<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header-cmp";
import Footer from "@/components/footer-cmp";

import { eventBus, USER_LOGGED } from "./services/EventBusService.js";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch({ type: "checkIfLogged" }).then(user => {
      eventBus.$emit("USER_LOGGED", user);
    });
  }
};
</script>

<style lang="scss">
#app {
  background-color: #f6f6f6;

  // height: 100vh;
}
</style>
