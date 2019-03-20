<template>
  <section class="navBar-warpper">
    <div class="nav-container">
      <div class="logo-wrapper">
        <h1>LOGO</h1>
      </div>
      <!-- <div class="search-container">
        <input type="text">
      </div>-->
      <div class="links-container">
        <router-link to="/about">About</router-link>
        <router-link to="/recipes">Recipes</router-link>
        <router-link to="/log-in">Log In</router-link>
        <router-link to="/sign-up">Sign Up</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scpoed lang="scss">
.navBar-warpper {
  width: 100%;
  height: 130px;
  background-color: burlywood;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
