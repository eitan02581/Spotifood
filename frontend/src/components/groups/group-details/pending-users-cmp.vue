<template>
  <section v-if="pendUsers.length >= 1">
    <div class="title">
      <h1>Pending Users</h1>
    </div>
    <div class="pending-container">
      <div class="user-container" v-for="user in pendUsers" :key="user._id">
        <div class="info-container">
          <div class="name">{{user.username}}</div>
          <div class="country">{{user.country}}</div>
          <router-link :to="'/user/' + user._id">
            <div class="img-container">
              <img :src="user.img" alt>
            </div>
          </router-link>
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
  },
  methods: {
    onAcceptUser(user) {
      this.$store
        .dispatch({
          type: "acceptUserToGroup",
          ids: { userId: user._id, groupId: this.groupId }
        })
        .then(res => {
          this.$toast.Success(`${user.username} Added`);
        });
    },
    onDeclineUser(user) {
      this.$store
        .dispatch({
          type: "declineUserRequest",
          ids: { userId: user._id, groupId: this.groupId }
        })
        .then(() => this.$toast.Error(`${user.username} declined`));
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
        object-fit: cover;
        width: 50px;
        border-radius: 50px;
      }
    }
  }
  .request-container {
    display: flex;
  }
}

@media only screen and (max-width: 600px) {
  section {
    margin-top: 76px;
  }
  .pending-container {
    max-width: 275px;
  }
}
</style>
