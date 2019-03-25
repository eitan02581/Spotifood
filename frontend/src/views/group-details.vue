<template>
  <section class="group-details">
    <loading-cmp v-if="!group"/>
    <template v-if="group">
      <!-- ONLY FOR ADMIN pending users -->
      <template v-if="isAdmin">
        <pandingUser :groupId="group._id" :pendUsers="pendUsers"></pandingUser>
      </template>
      <!-- ONLY FOR USER  join or leave btn-->
      <template v-if="!isAdmin">
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
      </template>
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
      isAbleToJoin: true,
      isAdmin: true,
      user: null
    };
  },
  components: {
    recipesList,
    loadingCmp,
    groupMainContent,
    pandingUser
  },
  created() {
    console.log("group details created!");
    this.$store
      // <<<<<<< HEAD
      .dispatch({ type: "getGroupById", groupId: this.$route.params.groupId })
      // get group
      .then(() => {
        console.log("maybe here?");
        this.user = this.$store.getters.user;
        console.log("group details func runs");
        this.checkIfUserIsAdmin();
      })
      // check if user able to join a group
      .then(() => {
        // TODO: FIX NAMMING AFTER ALEX PUSH
        this.checkIfUserAbaleToJoin();
        // =======
        // .dispatch({type:"getGroupById", groupId: this.$route.params.groupId })
        // .then(() => {
        //   this.$store
        //     .dispatch({type:"getUserById", userId: this.$store.getters.group.admin })
        //     .then(adminUser => {
        //       this.$store.commit("setAdminObj", { admin: adminUser });
        //     });
        // >>>>>>> 329929b18896f1a128398ae63689f67f94043e3e
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
    },
    checkIfUserIsAdmin() {
      this.$store
        .dispatch({
          type: "getUserById",
          userId: this.$store.getters.group.admin
        })
        // check if admin
        .then(adminUser => {
          // if user is the group admin => disable to join
          if (this.user._id !== adminUser._id) {
            this.$store.commit({ type: "setIsGroupAdmin", bool: false });
            this.isAdmin = false;
          } else {
            this.$store.commit({ type: "setIsGroupAdmin", bool: true });
            this.isAdmin = true;
          }
          this.$store.commit("setAdminObj", { admin: adminUser });
        });
    },
    checkIfUserAbaleToJoin() {
      var group = this.$store.getters.group;
      console.log(group);

      var isParticipant = group.pendingUsers.findIndex(participant => {
        return participant._id === this.user._id;
      });
      console.log(isParticipant);

      if (isParticipant === -1) {
        this.isAbleToJoin = false;
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
    right: 0;
    margin-right: 50px;
  }
}
</style>
