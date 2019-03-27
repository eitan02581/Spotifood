<template>
  <section data-aos="fade" data-aos-duration="900">
    <div class="form-wrapper">
      <form>
        <h1>Sign Up</h1>
        <el-input placeholder="Username" v-model="user.username">
          <template slot="prepend">
            <i class="fas fa-user"></i>
          </template>
        </el-input>
        <el-input placeholder="NickName" v-model="user.nickName">
          <template slot="prepend">
            <i class="fas fa-user"></i>
          </template>
        </el-input>
        <el-input type="password" placeholder="Password" v-model="user.password">
          <template slot="prepend">
            <i class="fas fa-lock"></i>
          </template>
        </el-input>
        <!-- <el-input placeholder="Email" v-model="user.email"></el-input> -->
        <el-input placeholder="Your Country" v-model="user.country"></el-input>
        <el-input placeholder="Your City" v-model="user.city"></el-input>

        <el-button type="primary" @click="signup">Sign Up</el-button>
      </form>
      <div class="login-container">
        <h4>
          Already Signed?
          <router-link to="/login">Log In</router-link>
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
        nickName: null,
        password: null,
        country: null,
        city: null
      }
    };
  },
  created() {},
  methods: {
    signup() {
      this.$store.dispatch({ type: "signUp", newUser: this.user }).then(() => {
        var userWithId = this.$store.getters.user;
        eventBus.$emit("USER_LOGGED", userWithId);
        this.$toast.Success(`Welcome ${user.username}`);
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  height: 100%;
    padding-top: 90px;
  @media (min-width: 850px) {
    padding-top: 110px;
  }
  background-image: url("../assets/group-imgs/table4.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .form-wrapper {
    background-color: #ffffffd4;
    width: 90%;
    @media (min-width: 850px) {
      width: 400px;
    }
    margin: 0 auto;
    margin-top: -50px;
    margin-bottom: 20px;
    box-shadow: rgba(black, 0.4) 0 0 25px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    form {
      padding: 40px 60px 0 60px;
      *:not(:first-child) {
        margin: 15px 0;
      }
      button {
        width: 100%;
      }
    }
    .login-container {
      border-top: 1px solid rgb(207, 207, 207);
      border-radius: 0 0 5px 5px;
      background-color: rgba(238, 238, 238, 0.637);
      height: 100%;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(119, 119, 119);
    }
  }
}
</style>
