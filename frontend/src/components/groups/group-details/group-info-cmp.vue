<template>
  <section class="group-info">
    <h1>{{group.title}}</h1>
    <div class="flex">
      <i class="fas fa-map-marker-alt"></i>
      <h3>{{group.place}}</h3>
    </div>
    <div class="flex">
      <i class="far fa-clock"></i>
      <h3>{{group.time | time }}</h3>
    </div>
    <div class="admin-profile">
      <img :src="group.users[0].img">
      <h2>{{group.users[0].username}}</h2>
    </div>
    <el-tag type="warning" v-for="hashtag in group.hashtags" :key="hashtag">#{{hashtag}}</el-tag>
    <participants-list :users="group.users.slice(1)"/>
  </section>
</template>

<script>
import participantsList from './participants-list-cmp'
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  components:{
    participantsList
  }
}
</script>

<style scoped lang="scss">
.group-info {
  padding-left: 10px;
  margin-top: 15px;
  h1 {
    font-size: 2.5em;
  }
  h3 {
    font-size: 1em;
    color: gray;
    margin-left: 30px;
    margin-top: -2px;
  }
  & > * {
    margin-bottom: 2vh;
  }
  i {
    position: absolute;
    margin-left: 1px;
  }
  .admin-profile {
    display: flex;
    align-items: center;
    img {
      height: 5vh;
      width: 5vh;
      object-fit: contain;
      border-radius: 5vh;
    }
    h2 {
      margin-left: 10px;
    }
  }
}
</style>
