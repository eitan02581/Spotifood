<template>
  <section class="group-details">
    <!-- ONLY FOR ADMIN -->
    <loading-cmp v-if="!group"/>
    <template v-if="group">
      <pandingUser :groupId="group._id" :pendUsers="pendUsers"></pandingUser>
      <div v-if="isAbleToJoin" class="join-btn-container">
        <div class="join-btn-container">
          <el-button @click.native="onJoinGroup" type="success">Join +</el-button>
        </div>
      </div>
      <group-main-content :group="group"/>
      <recipes-list :recipes="group.recipes"/>
    </template>
  </section>
</template>

<script>
import groupMainContent from "../components/groups/group-details/group-main-content-cmp";
import recipesList from "../components/groups/group-details/group-recipes-list-cmp";
import loadingCmp from "../components/loading-cmp";
import pandingUser from "../components/groups/group-details/pending-users-cmp";
export default {
  data() {
    return {
      isAbleToJoin: true
    };
  },
  components: {
    recipesList,
    loadingCmp,
    groupMainContent,
    pandingUser
  },
  created() {
    this.$store
      .dispatch({type:"getGroupById", groupId: this.$route.params.groupId })
      .then(() => {
        this.$store
          .dispatch({type:"getUserById", userId: this.$store.getters.group.admin })
          .then(adminUser => {
            this.$store.commit("setAdminObj", { admin: adminUser });
          }); 
      });
  },
  computed: {
    group() {
      return this.$store.getters.group;
    },
    pendUsers() {
      return this.$store.getters.pendUsers;
    }
  },
  methods: {
    onJoinGroup() {
      var user = this.$store.getters.user;
      var group = this.$store.getters.group;
      this.$store
        .dispatch({
          type: "askJoinGroup",
          ids: { userId: user._id, groupId: group._id }
        })
        .then(() => {
          this.isAbleToJoin = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.group-details {
  min-height: calc(100vh - 230px);
  max-height: 100%;
}
.join-btn-container {
  text-align: center;
  button {
    position: fixed;
  }
}
</style>
