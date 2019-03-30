<template>
  <section v-if="users.length >= 1">
    <div class="title">
      <h1>Pending Users</h1>
    </div>
    <div class="pending-container">
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
      console.log("Problem is Here?");
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
            .then(() => this.$toast.Success(`${user.username} Added`));
          // show message
          // this.showMsg(true, user);

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
.title {
  h1 {
    text-align: center;
    margin-bottom: 10px;
    color: #607d8b;
  }
}
.pending-container {
  width: 100%;
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  overflow: scroll;
      max-width: 365px;
    justify-content: center;
    height: 155px;
}
.user-container {
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
  min-width: 90px;
  .info-container {
    .country {
      color: #f44336;
    }
    .name {
      color: #607d8b;
    }
    .img-container {
      img {
        height: 50px;
        width: 50px;
        border-radius: 50px;
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  section {
    margin-top: 76px;
  }
}
</style>
