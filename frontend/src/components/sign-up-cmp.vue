<template>
  <section data-aos="fade" data-aos-duration="900">
    <div class="first-screen form-wrapper" v-if="!isCompleteFirstStep">
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

        <el-button type="primary" @click="nextStep">Continue</el-button>
      </form>
      <div class="login-container">
        <h4>
          Already Signed?
          <router-link to="/login">Log In</router-link>
        </h4>
      </div>
    </div>
    <div class="second-screen form-wrapper" v-else>
      <h1>Favoriete Cuisines</h1>
      <div class="cuisine-container">
        <div
          class="cuisine-option"
          :class="{selected:cuisine.isSelected}"
          v-for="(cuisine,idx) in cuisines"
          :key="idx"
          @click="selectCuisine(Object.keys(cuisine)[0],idx)"
        >
          <input type="radio" :value="Object.keys(cuisine)[0]" :ref="Object.keys(cuisine)[0]">
          <img :src="Object.values(cuisine)[0]">
        </div>
      </div>
      <div class="bts">
        <el-button type="info" @click="goBack">Back</el-button>
        <el-button type="primary" @click="signup">Sign Up</el-button>
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
      },
      isCompleteFirstStep: false,
      cuisines: []
    };
  },
  created() {
    var categories = this.$store.getters.categories;
    var categoriesImgs = this.$store.getters.categoriesImgs;
    this.cuisines = categories.map((category, idx) => {
      var obj = {};
      obj[category] = categoriesImgs[idx];
      obj.isSelected = false;
      return obj;
    });
  },
  methods: {
    nextStep() {
      this.isCompleteFirstStep = true;
    },
    selectCuisine(ref, idx) {
      var checkedToggle = this.$refs[ref][0];
      checkedToggle.checked = !checkedToggle.checked;
      this.cuisines[idx].isSelected = !this.cuisines[idx].isSelected;
    },
    signup() {
      var categories = this.$store.getters.categories;
      this.user.favCategories = categories.filter(
        (img, idx) => this.cuisines[idx].isSelected
      );
      this.$store.dispatch({ type: "signUp", newUser: this.user }).then(() => {
        var userWithId = this.$store.getters.user;
        eventBus.$emit("USER_LOGGED", userWithId);
        this.$toast.Success(`Welcome ${this.user.username}`);
        this.$router.push(`/user/${userWithId._id}`);
      });
    },
    goBack() {
      this.isCompleteFirstStep = false;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .second-screen {
    margin: 0 auto;
  }
  .first-screen {
    margin: 0 auto;
  }
  height: 100%;
  padding-top: 150px;
  background-image: url("../assets/group-imgs/table4.jpg");
  // background-color: lightseagreen;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .form-wrapper {
    // margin-top: 100px;
    background-color: #ffffffd4;
    max-width: 400px;
    margin-top: -50px;
    box-shadow: unset;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    form {
      // height: 350px;

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

    h1 {
      font-size: 2em;
      margin: 20px;
      color: #424242;
    }

    .cuisine-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .cuisine-option {
        cursor: pointer;
        position: relative;
        margin: 10px;
        border-radius: 15px;
        padding: 5px;
        input {
          display: none;
        }
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
    .bts {
      display: flex;
      justify-content: space-evenly;
    }
    button {
      margin: 10px;
    }
  }
  .selected {
    background-color: green;
  }
  @media (min-width: 550px) {
    .second-screen {
      margin: 0 auto 120px auto;
    }
    .first-screen {
      margin: 0 auto 50px auto;
    }
  }
  @media (min-width: 450px) {
    .form-wrapper {
      box-shadow: rgba(black, 0.4) 0 0 25px;
    }
    .second-screen {
      margin: 0 auto 70px auto;
    }
  }
}
</style>
