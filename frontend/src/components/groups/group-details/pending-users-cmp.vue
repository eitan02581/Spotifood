<template>
  <section>
    <div class="user-container" v-for="user in users" :key="user._id">
      <div class="info-container">
        <div class="name">{{user.username}}</div>
        <div class="country">{{user.country}}</div>
        <div class="img-container">
          <img :src="user.img" alt>
        </div>
      </div>
      <div class="request-container">
        <el-button @click="onAcceptUser(user)" type="success" icon="el-icon-check" circle></el-button>
        <el-button @click="onDeclineUser(user)" type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </div>
    <div class="action-status-container" v-if="pendingMsg">{{pendingMsg}}</div>
  </section>
</template>

<script>
export default {
  props: {
    pendUsers: {
      type: Array
    },
    groupId: {
      type: String
    }
  },
  data() {
    return {
      users: [],
      pendingMsg: null
    };
  },
  created() {
    this.pendUsers.forEach(userId => {
      console.log('Problem is Here?')
      console.log('User id : ',userId)
      this.$store.dispatch({ type: "getUserById", userId }).then(user => {
        // var user = this.$store.getters.user;
        this.users.push(user);
      });
    });
  },
  methods: {
    onAcceptUser(user) {
      this.$store
        .dispatch({
          type: "acceptUserToGroup",
          ids: { userId: user._id, groupId: this.groupId }
        })
        .then(res => {
          // update user's group array
<<<<<<< HEAD
          this.$store
            .dispatch({
              type: "addGroupToUser",
              ids: { userId: user._id, groupId: this.groupId }
            })
            .then(console.log("heyyy"));
          // TODO: ALERT THE USER ABOUT THE ACTION
          this.$toast.Success(`${user.nickName} added to group!`)
          // check if its enough 
          this.pendingRes = `${user.nickName} added!`;
          setTimeout(() => {
            this.pendingRes = null;
          }, 1200);
=======
          this.$store.dispatch({
            type: "addGroupToUser",
            ids: { userId: user._id, groupId: this.groupId }
          });
          // show message
          this.showMsg(true, user);

>>>>>>> a131fde3a99283ff4461aba9817ff94df7d70864
          // remove user from users
          // TODO: FIX BUG WHEN ACC OR DEC ON ONE , ALL THE PENDING USERS DISAPPEAR
          this.users = this.users.filter(user => user._id !== user._id);
        });
    },
    onDeclineUser(user) {
      this.$store
        .dispatch({
          type: "declineUserRequest",
          ids: { userId: user._id, groupId: this.groupId }
        })
        .then(res => {
          this.showMsg(false, user);
          this.users = this.users.filter(user => user._id !== user._id);
        });
    },
    showMsg(state, user) {
      this.pendingMsg = state
        ? `${user.nickName} added!`
        : `${user.nickName} declined!`;
      setTimeout(() => {
        this.pendingMsg = null;
      }, 1200);
    }
  }
};
</script>

<style scoped lang="scss">
.user-container {
  .info-container {
    .img-container {
      img {
        width: 50px;
      }
    }
  }
}
</style>
