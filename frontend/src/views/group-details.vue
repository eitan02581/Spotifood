<template>
  <section class="group-details">
    <!-- ONLY FOR ADMIN -->
    <loading-cmp v-if="!group"/>
    <template v-if="group">
      <pandingUser :groupId="group._id" :pendUsers="pendUsers"></pandingUser>
      <div v-if="isAbleToJoin" class="join-btn-container">
        <div class="join-btn-container">
          <el-button @click.native="onStatusActionGroup('join')" type="success">Join +</el-button>
        </div>
      </div>
      <div v-else class="cancel-btn-container">
        <div class="cancel-btn-container">
          <el-button @click.native="onStatusActionGroup('leave')" type="danger">leave</el-button>
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
    // this.$store.dispatch("getGroupById", {
    //   groupId: this.$route.params.groupId
    // });
    this.$store
      .dispatch("getGroupById", { groupId: this.$route.params.groupId })
      .then(() => {
        this.$store
          .dispatch("getUserById", { userId: this.$store.getters.user._id })
          .then(() => {
            this.$store.commit("setAdminObj", {
              admin: this.$store.getters.user
            });
          });
      })
      // check if user able to join a group
      .then(() => {
        // TODO: FIX NAMMING AFTER ALEX PUSH
        var group = this.$store.getters.group;
        var user = this.$store.getters.user;
        var isParticipant = group.pendingUsers.find(
          userId => userId._id === user._id
        );
        if (isParticipant) {
          this.isAbleToJoin = false;
        }
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
    onStatusActionGroup(status) {
      var user = this.$store.getters.user;
      var group = this.$store.getters.group;
      if (status === "join") {
        this.$store
          .dispatch({
            type: "askJoinGroup",
            ids: { userId: user._id, groupId: group._id }
          })
          .then(() => {
            this.isAbleToJoin = false;
          });
      } else {
        this.$store
          .dispatch({
            type: "leaveGroup",
            ids: { userId: user._id, groupId: group._id }
          })
          .then(() => {
            this.isAbleToJoin = true;
          });
      }
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
