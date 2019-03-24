<template>
  <section>
    <div class="user-profile-container">
      <div class="img-container">
        <img :src="user.img" alt>
      </div>
      <div class="dashboard-container">
        <div class="name-container">
          <h1>{{user.username}}</h1>
        </div>
        <div class="stats-container">
          Groups: {{user.groups.length === 0 ? 'Not Yet' : user.groups.length }} |
          Favorit categories: {{user.favCategories.length === 0 ? 'Not Yet' : user.favCategories.length }}
        </div>
      </div>
    </div>
    <div class="group-preview-item" v-for="group in groups" :key="group._id">
      <groupPreview :group="group"></groupPreview>
    </div>
    <!-- <el-button type="success" @click="$emit('delete' , group._id)">Delete</el-button> -->
    <!-- <router-link :to="'/group/edit/' + group._id">
            <el-button type="danger">Edit</el-button>
    </router-link>-->
  </section>
</template>

<script>
import groupPreview from "../components/groups/group-preview-cmp.vue";
export default {
  components: {
    groupPreview
  },
  data() {
    return {
      groups: []
    };
  },
  created() {
    var userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getUserById", userId }).then(() => {
      var user = this.$store.getters.user;
      if (user.groups) {
        user.groups.forEach(groupId => {
          this.$store.dispatch({ type: "getGroupById", groupId }).then(() => {
            var group = this.$store.getters.group;
            this.groups.push(group);
          });
        });
      }
    });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped lang="scss">
.user-profile-container {
  display: flex;
  margin-left: 30px;
  .dashboard-container {
    margin-left: 30px;
    text-align: center;
    .stats-container {
      margin-top: 30px;
    }
  }
}
</style>
