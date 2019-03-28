<template>
  <section>
    <div class="form-wrapper">
      <form>
        <h1>Login</h1>
        <el-input placeholder="Username" v-model="user.username">
          <template slot="prepend">
            <i class="fas fa-user"></i>
          </template>
        </el-input>
        <el-input type="password" placeholder="Password" v-model="user.password">
          <template slot="prepend">
            <i class="fas fa-lock"></i>
          </template>
        </el-input>
        <el-button type="primary" @click.enter="login">Log In</el-button>
      </form>
      <div class="signup-container">
        <h4>
          Not A User?
          <router-link to="/signup">Sign Up</router-link>
        </h4>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBus, USER_LOGGED } from "../services/EventBusService.js";

export default {
  data() {
    return {
      user: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    login() {
      if (!this.user.username || !this.user.password) {
        this.$toast.Error(`Invalid Username or Password`);
        return;
      } else {
        console.log("user to login is", this.user);
        this.$store.dispatch({ type: "logIn", user: this.user }).then(() => {
          var user = this.$store.getters.user;
          this.$toast.Success(`Welcome ${this.user.username}`);
          eventBus.$emit("USER_LOGGED", user);
          this.$router.push("/");
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  background-image: url("../assets/group-imgs/beer.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  background-attachment: fixed;

  // margin-top: 150px;
  padding-top: 100px;
  .form-wrapper {
    background-color: #ffffffda;
    width: 90%;
    @media (min-width: 500px) {
      width: 400px;
    }
    height: 350px;
    margin: 0 auto;
    margin-bottom: 300px;
    margin-top: 50px;
    box-shadow: rgba(black, 0.4) 0 0 25px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    form {
      height: 350px;

      padding: 40px 60px 0 60px;
      *:not(:first-child) {
        margin: 15px 0;
      }
      button {
        width: 100%;
      }
    }
    .signup-container {
      border-top: 1px solid rgb(207, 207, 207);
      border-radius: 0 0 5px 5px;
      background-color: rgba(238, 238, 238, 0.637);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(119, 119, 119);
    }
  }
}
</style>
