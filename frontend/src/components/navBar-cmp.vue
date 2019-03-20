<template>
  <section class="nav-warpper">
    <div class="nav-container">
      <div class="logo-wrapper">
        <router-link to="/">
          <h1>LOGO</h1>
        </router-link>
      </div>
      <div class="links-container">
        <router-link to="/groups">
          <button>Explore</button>
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
export default {};
</script>

<style scpoed lang="scss">
.nav-warpper {
  width: 100%;
  height: 130px;
  display: flex;
  background-color: #ffffff5c;
  align-items: center;
  justify-content: space-between;
  // position: fixed;
  // opacity: 0.5;
  z-index: 1111;
  .nav-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 1;
    .logo-wrapper {
      // width: 10%;
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
        }
      }
    }
  }
}
</style>
