<template>
  <div id="app">
    <Header></Header>
    <div id="top"></div>
    <router-view class="content" data-aos="fade"/>
    <a :class="{show:scrollable}" id="button" v-scroll-to="'#top'">
      <i class="fas fa-arrow-up"></i>
    </a>
    <Popup></Popup>
    <Footer></Footer>
  </div>
</template> 

<script>
import Header from "@/components/header-cmp";
import Footer from "@/components/footer-cmp";
import Popup from "@/components/popup";
import { eventBus, USER_LOGGED } from "./services/EventBusService.js";

export default {
  components: {
    Header,
    Popup,
    Footer
  },
  data() {
    return {
      scrollable: false
    };
  },
  created() {
    this.$store
      .dispatch({ type: "checkIfLogged" })
      .then(user => {
        eventBus.$emit('USER_LOGGED', user)
      })
      .catch(() => console.log("sorry user not connected"));
    var vm = this;
    window.addEventListener("scroll", function(e) {
      var scrollPos = window.scrollY;
      if (scrollPos > 530) {
        vm.scrollable = true;
      } else {
        vm.scrollable = false;
      }
    });
  }
};
</script>

<style lang="scss">
.content {
  // min-height: 100%;
}
#app {
  background-color: #f6f6f6;

  display: flex;
  flex-direction: column;

  min-height: 100vh;
}
#button {
  display: inline-block;
  background-color: #ff5100;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  transition: background-color 0.3s, opacity 0.5s, visibility 0.5s;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
}
#button:hover {
  cursor: pointer;
  background-color: #333;
}
#button:active {
  background-color: #555;
}
#button.show {
  opacity: 1;
  visibility: visible;
}
</style>
