<template>
  <section class="about-page-wrapper">
    <div class="about-item">
      <img src="../assets/about/alex.jpg" alt="Alex Yeruhin">
      <h1>Alex Yeruhin</h1>
      <p>
        Alex Yeruhin, 21 from Netanya , full stack developer web application.
        specialize in javascript ,css ,html ,vue ,vuex ,nodeJS and MongoDB and also have knowladge at Basic linux scripting.
      </p>
      <a href="https://yeruhin.github.io/my-gallery/">
        <el-button type="primary">Portofolio</el-button>
      </a>
    </div>
    <div class="about-item">
      <a href="https:/eitan02581.github.io/portofolio/">
        <img src="../assets/about/eitan.jpg" alt>
      </a>
      <h1>Eitan Elnekave</h1>
      <p>Hey I'm Eitan 22 years old , love surfing and programming , passionate about css and Vue js checkout my portofolio</p>
      <a href="https://eitan02581.github.io/portofolio/">
        <el-button type="primary">Portofolio</el-button>
      </a>
    </div>
    <div class="about-item">
      <img src="../assets/about/yovel-prof (1).png" alt>
      <h1>Yovel Becker</h1>

      <p>Yovel Becker, 21, Recently released soldier. currently becoming a junior full stack web developer. Learning web app development in Coding Academy. Knowledge and experience in C#, Javascript, HTML5 and CSS3 and VueJS.</p>
      <a href="https://eitan02581.github.io/portofolio/">
        <el-button type="primary">Portofolio</el-button>
      </a>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  flex-grow: 1;
}
.about-page-wrapper {
  width: 90%;
  padding-top: 100px;
  margin-bottom: 100px;

  height: 100vh;
  margin: 0 auto;
  // border-right: 1px solid black;
  // border-left: 1px solid black;
  h1 {
    color: #f44336;
    margin: 0;
  }
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  p {
    color: gray;
  }
  // align-items: center;
  .about-item {
    // border: 1px solid red;
    margin: 15px;
    padding: 20px;
    width: 300px;
    height: 450px;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    align-items: center;
    img {
      margin-bottom: 30px;
      width: 200px;
      border-radius: 50%;
    }
  }
}
</style>
