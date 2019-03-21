<template>
  <section class="group-aside">
    <aside-header :admin="users[0]"/>
    <hr>
    <participants-list :users="participants"/>
  </section>
</template>

<script>
import participantsList from "./participants-list-cmp";
import asideHeader from './aside-header-cmp'


export default {
  // props: ['users'],
  props:{
      users: {
        type: Array,
        required: true
      }
    },
  // {
  //   userCards: array,
  //   groupsCards: array
  // },
  components: {
    participantsList,
    asideHeader
  },
  data() {
    return {
    };
  },
  created() {
    console.log(this.users)
  },
  computed:{
    participants(){
      console.log(this.users.slice(1))
      return this.users.slice(1)
    }
  }
};
</script>

<style scoped>
.group-aside {
  display: flex;
  flex-direction: column;
  position: fixed;
  top:130px;
  /* left: 1vw; */
  right: 0;
  height: calc(100vh - 230px);
  width: 20vw;
  background-color: aquamarine;
}
hr {
  margin: 0;
  padding: 0;
}
</style>
