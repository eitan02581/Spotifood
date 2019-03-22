<template>
  <section :class="{narrowing:isNavNerrow , 'nav-warpper':!isNavNerrow }">
    <div class="nav-container">
      <div class="logo-wrapper">
        <router-link to="/">
          <h1>WEat</h1>
        </router-link>
      </div>
      <div class="links-container">
        <router-link  to="/groups">
          <button>Explore</button>
        </router-link>
        <router-link to="/groups/add">
          <button>Create Group</button>
        </router-link>
        <router-link to="/about">
          <button>About</button>
        </router-link>
        <router-link to="/login">
          <button>Log In</button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isNavNerrow: false,
      isHomePage: true
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
  },
  methods: {
    narrowNav(state) {
      this.isNavNerrow = state;
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
      a {
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
      }
    }
    .links-container {
      height: 100%;
      display: flex;
      max-width: 600px;
      width: 90%;
      a {
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
