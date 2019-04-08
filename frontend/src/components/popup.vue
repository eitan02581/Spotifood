<template>
    <transition name="fade">
  <router-link v-if="group" :to="'/groups/'+group._id">
    <section>
      <img :src="img">
      <h4>{{msg}}</h4>
    </section>
  </router-link>
    </transition>
</template>

<script>
import { eventBus, USER_LOGGED } from "../services/EventBusService.js";

export default {
  data() {
    return {
      msg: "",
      img:'',
      group: null
    };
  },
  created() {
    eventBus.$on("userJoined", (group) => {
      this.msg =`${group.pendingUsers[group.pendingUsers.length - 1].nickName} Asked To Join ${group.title}`
      this.img = group.pendingUsers[group.pendingUsers.length - 1].img
      this.group = group
      setTimeout(() => {
        this.group= null
      }, 4000);
    });
    eventBus.$on("acceptedToGroup", (group) => {
      this.msg =`${group.admin.nickName} Accepted you to ${group.title}`
      this.img = group.admin.img
      this.group = group
      setTimeout(() => {
        this.group= null
      }, 4000);
    });
  }
};
</script>

<style lang="scss" scoped>
section {
  background-color: rgba(255, 239, 239, 0.952);
  width: 300px;
  height: 100px;
  position: fixed;
  // bottom: -100px;
  // right: -300px;
    bottom: 20px;
  right: 20px;

  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: rgb(71, 71, 71);
  transition:1s;
  -webkit-box-shadow: 1px 6px 17px 0px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 1px 6px 17px 0px rgba(0, 0, 0, 0.57);
  box-shadow: 1px 6px 17px 0px rgba(0, 0, 0, 0.57);
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  h4 {
    margin: 0;
  }
  .show{
    transition: opacity 2s ease-in;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
