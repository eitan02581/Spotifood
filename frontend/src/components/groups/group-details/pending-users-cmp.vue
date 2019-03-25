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
    <div class="action-status-container" v-if="pendingRes">{{pendingRes}}</div>
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
      pendingRes: null
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
          // remove user from users
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
          // TODO: ALERT THE USER ABOUT THE ACTION
          this.pendingRes = `${user.nickName} declined!`;
          setTimeout(() => {
            this.pendingRes = null;
          }, 1200);
          this.users = this.users.filter(user => user._id !== user._id);
        });
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
