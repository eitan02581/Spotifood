<template>
  <section class="profile-container">
    <profile-details :isMyUserProfile="isMyUserProfile" :user="user" :groups="groupsToTimeline" v-if="user"/>
    <el-carousel :interval="600000" type="card" height="550px" style="text-align: center;">
      <el-carousel-item v-for="group in managedGroups" :key="group._id">
        <groupPreview :group="group"/>
      </el-carousel-item>
    </el-carousel>

  </section>
</template>

<script>
import groupPreview from "../components/groups/group-preview-cmp.vue";
import profileDetails from "../components/users/profile-details-cmp";
import imgCarousel from "../components/image-carousel-cmp";

export default {
  components: {
    groupPreview,
    profileDetails,
    imgCarousel
  },
  data() {
    return {
      user: null,
      groups: [],
      managedGroups: [],
      isMyUserProfile:false,

    };
  },
  created() {
    var userId = this.$route.params.userId;
    this.isMyUserProfile = (this.$store.getters.user && this.$store.getters.user._id === userId) ? true : false
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      this.user = user;
      if (user.groups) this.getUserGroups();
    });
  },
  methods: {
    getUserGroups() {
      this.user.groups.forEach(groupId => {
        this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
          group.color = '#e4e7ed'
          this.groups.push(group);
        });
      });

      this.user.createdGroups.forEach(groupId => {
        this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
          group.color = 'black'
          this.managedGroups.push(group);
        });
      });
    }
  },
  computed:{
    groupsToTimeline(){
      return this.groups.concat(this.managedGroups)
    }
  }
};
</script>

<style scoped lang="scss">
.profile-container {
  // min-width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
