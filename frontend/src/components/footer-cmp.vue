<template>
  <section>
    <div class="footer-wrapper">
      <div class="left-side">
        <router-link to>
          <h1>
            Join
            <router-link to="/login">
              <span>WEat</span>
            </router-link>
          </h1>
        </router-link>
      </div>
      <div class="right-side">
        <div class="follow">
          <h1>Follow</h1>
          <ul>
            <router-link to>
              <li>Face</li>
            </router-link>
            <router-link to>
              <li>Inst</li>
            </router-link>
            <router-link to>
              <li>Twit</li>
            </router-link>
          </ul>
        </div>
        <div class="navigate">
          <h1>Navigate</h1>
          <ul>
            <router-link to="/groups">
              <li>Explore</li>
            </router-link>
            <router-link to="/about">
              <li>About</li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  .footer-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  position: relative;
  padding-top: 30px;
  height: 200px;
  width: 100%;
  background-color: rgb(66, 66, 66);
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .left-side {
    margin-left: 20px;
    h1 {
      font-size: 35px;
      color: white;
      span {
        color: #f44336;
      }
    }
  }
  .right-side {
    display: flex;
    justify-content: space-around;
    width: 50%;
    min-width: 250px;
    h1 {
      border-bottom: 1px grey solid;
      cursor: default;
    }
    .follow {
      width: 50%;
      margin-right: 15px;
    }
    .navigate {
      margin-right: 15px;
      width: 50%;
    }
    ul {
      a {
        display: inline-block;
      }
      display: flex;
      flex-direction: column;
      li {
        padding: 5px;
        color: white;
        display: inline-block;
      }
      li:hover {
        color: #f44336;
      }
    }
  }
}
</style>
