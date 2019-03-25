<template>
  <section class="profile-container">
    <profile-details :user="user" :groups="groups" v-if="user"/>
    <!-- <div class="group-preview-item"> -->
    <!-- <el-carousel :interval="600000" type="card" height="500px" style="text-align: center;">
        <el-carousel-item v-for="group in groups" :key="group._id">
          <groupPreview :group="group"/>
        </el-carousel-item>
    </el-carousel>-->
    <!-- <groupPreview v-for="group in groups" :key="group._id" :group="group"/> -->
    <!-- </div> -->
    <!-- <el-button type="success" @click="$emit('delete' , group._id)">Delete</el-button> -->
    <!-- <router-link :to="'/group/edit/' + group._id">
            <el-button type="danger">Edit</el-button>
    </router-link>-->

    <!-- <h1>Reviews</h1> -->
  </section>
</template>

<script>
import groupPreview from "../components/groups/group-preview-cmp.vue";
import profileDetails from "../components/users/profile-details-cmp";

export default {
  components: {
    groupPreview,
    profileDetails
  },
  data() {
    return {
      user: null,
      groups: []
    };
  },
  created() {
    var userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      this.user = user;
      if (user.groups) this.getUserGroups();
    });
  },
  methods: {
    getUserGroups() {
      this.user.groups.forEach(groupId => {
        this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
          this.groups.push(group);
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.profile-container{
  // min-width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
