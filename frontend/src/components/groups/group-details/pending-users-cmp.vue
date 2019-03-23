<template>
  <section>
    <div class="user-container" v-for="user in users" :key="user._id">
      <div class="info-container">
        <div class="name">{{user.username}}</div>
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
    this.pendUsers.map(userId => {
      this.$store.dispatch({ type: "getUserById", userId }).then(() => {
        var user = this.$store.getters.user;
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
          // TODO: ALERT THE USER ABOUT THE ACTION
          this.pendingRes = `${user.nickName} added!`;
          setTimeout(() => {
            this.pendingRes = null;
          }, 1200);
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
