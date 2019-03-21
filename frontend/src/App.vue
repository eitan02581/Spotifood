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

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
