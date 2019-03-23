<template>
  <section :class="{narrowing:isNavNerrow , 'nav-warpper':!isNavNerrow }">
    <div class="nav-container">
      <div class="logo-wrapper">
        <router-link to="/">
          <h1>WEat</h1>
        </router-link>
      </div>
      <div class="links-container">
        <router-link class="nav-link-classic" to="/groups">
          <button>Explore</button>
        </router-link>
        <router-link v-if="user" class="nav-link-classic" to="/groups/add">
          <button>Create Group</button>
        </router-link>
        <router-link class="nav-link-classic" to="/about">
          <button>About</button>
        </router-link>
        <template v-if="!user">
          <router-link class="nav-link-classic" to="/login">
            <button>Log In</button>
          </router-link>
          <router-link class="nav-link-classic" to="/signup">
            <button>Sign Up</button>
          </router-link>
        </template>
        <template v-if="user">
          <div class="user-info-container">
            <router-link :to="'/user/' + user._id">
              <img :src="userImg" alt>
            </router-link>
          </div>
          <a class="nav-link-classic">
            <button class="logout" @click="onLogOut">Log Out</button>
          </a>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBus, USER_LOGGED } from "../services/EventBusService.js";
export default {
  data() {
    return {
      isNavNerrow: false,
      isHomePage: true,
      user: null
    };
  },
  created() {
    var path = this.$route.path;
    if (path !== "/") {
      this.isHomePage = false;
      this.isNavNerrow = true;
    }

    var vm = this;
    var val = window.addEventListener("scroll", function(e) {
      if (vm.isHomePage) {
        var scrollPos = window.scrollY;
        if (scrollPos > 530) {
          vm.narrowNav(true);
        } else {
          vm.narrowNav(false);
        }
      }
    });
    eventBus.$on("USER_LOGGED", user => {
      this.user = user;
    });
  },
  methods: {
    narrowNav(state) {
      this.isNavNerrow = state;
    },
    onLogOut() {
      console.log("dd");

      this.$store.dispatch({ type: "logOut" });
      this.user = null;
      this.$router.push("/");
    }
  },
  computed: {
    userImg() {
      return this.user.img
        ? this.user.img
        : "https://api.adorable.io/avatars/300/";
    }
  },
  watch: {
    "$route.path": function() {
      var path = this.$route.path;
      if (path !== "/") {
        this.isHomePage = false;
        this.isNavNerrow = true;
      } else {
        this.isHomePage = true;
        this.isNavNerrow = false;
      }
    }
  }
};
</script>

<style scpoed lang="scss">
.narrowing {
  top: 0;
  width: 100%;
  background-color: white;
  height: 50px;
  display: flex;
  // background-color: #ffffff5c;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  // opacity: 0.5;
  z-index: 1111;
  transition: 0.3s;

  .nav-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 1;
    -webkit-box-shadow: 0px 12px 118px -30px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 12px 118px -30px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 12px 118px -30px rgba(0, 0, 0, 0.75);
    .logo-wrapper {
      padding-left: 10px;
      font-size: 30px;
      h1 {
        color: #f44336;
      }
    }
    .links-container {
      height: 100%;
      display: flex;
      max-width: 600px;
      width: 90%;
      .user-info-container {
        display: flex;
        flex-direction: row;
        transition: 0.3s;
        justify-content: center;
        align-items: center;
        a {
          text-align: center;

          button {
            border: none;
            background-color: unset;
          }
          img {
            width: 29px;
            height: 29px;
            border-radius: 73px;
            transition: 0.3s;
          }
        }
      }
      .nav-link-classic {
        flex-grow: 1;
        margin: 2px;

        button {
          color: gray;
          flex-grow: 1;
          width: 100%;
          height: 100%;
          border: none;
          font-size: 25px;
          background-color: unset;
          cursor: pointer;
          transition: 0.3s;
          outline: none 1px solid;
        }
        button:hover {
          background-color: #f44336;
          color: white;
        }
      }
    }
  }
}
// homepage
.nav-warpper {
  top: 0;
  width: 100%;
  height: 130px;
  display: flex;
  // background-color: #ffffff5c;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  // opacity: 0.5;
  z-index: 1111;
  transition: 0.3s;

  .nav-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 1;
    .logo-wrapper {
      font-size: 30px;
      h1 {
        color: white;
        padding-left: 10px;
      }
    }
    .links-container {
      height: 100%;
      display: flex;
      max-width: 600px;
      width: 90%;
      .user-info-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 0.3s;
        a {
          text-align: center;

          button {
            border: none;
            background-color: unset;
          }
          img {
            width: 44px;
            border-radius: 73px;
            transition: 0.3s;
          }
        }
      }
      .nav-link-classic {
        flex-grow: 1;
        margin: 2px;

        button {
          flex-grow: 1;
          width: 100%;
          height: 100%;
          border: none;
          font-size: 25px;
          background-color: unset;
          cursor: pointer;
          transition: 0.3s;
          outline: none 1px solid;
        }
        button:hover {
          background-color: #9e9e9e87;
          outline: white 1px solid;
          color: white;
        }
      }
    }
  }
}
</style>
