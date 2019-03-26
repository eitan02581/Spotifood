<template>
  <section class="main-container">
    <div class="img-container">
      <img :src="user.img" alt>
    </div>
    <profile-Info :user="user" :showInput="showInput"/>
    <profile-experience :user="user" :groups="sortedGroups" :isMyUserProfile="isMyUserProfile" @editCuisine="editCuisine"/>
  </section>
</template>

<script>
import profileInfo from "./profile-info-cmp";
import profileExperience from "./profile-experience-cmp";
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    groups: {
      type: Array,
      required: true
    },
    isMyUserProfile:{
      type:Boolean,
      required:true
    }
  },
  components: {
    profileInfo,
    profileExperience
  },
  data(){
    return{
      showInput:false
    }
  },
  computed: {
    sortedGroups() {
      console.log('time:')
      return this.groups.sort((a, b) => a.time - b.time);
    }
  },
  methods:{
    editCuisine(){
      this.showInput = true
    }
  }
};
</script>

<style lang=scss>
.main-container {
  display: flex;
  width: 100%;
  margin-bottom: 50px;
  & > * {
    padding: 10px;
  }
  .img-container {
    width: 40%;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
