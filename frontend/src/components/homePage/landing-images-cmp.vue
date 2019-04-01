<template>
  <section>
    <div id="backgroundDiv">
      <div id="backgroundBlock">
        <carousel :per-page="1" :autoplay="true" :autoplayTimeout="3500" :loop="true">
          <slide v-for="backGround in backGrounds" :key="backGround">
            <img :src="backGround">
          </slide>
        </carousel>
        <div class="blank"></div>
        <div id="backgroundMessage">
          <div class="home-page-titles">
            <h1>
              <span style="color:#f44336">W</span>Eat
            </h1>
            <h1 class="slogan">
              Cook
              <span style="color:#f44336;">&</span> Eat Together
            </h1>
          </div>
          <a href="#" v-scroll-to="'#element'">
            <i class="fas fa-chevron-circle-down"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      backGrounds: [
        "http://res.cloudinary.com/sprint4-weat/image/upload/v1554013255/demo/fziey1adeazzlx84tcwg.jpg",
        "http://res.cloudinary.com/sprint4-weat/image/upload/v1554013340/demo/z0rtpehj0cbbvo58zrxs.jpg",
        "http://res.cloudinary.com/sprint4-weat/image/upload/v1554013373/demo/kwuofgd9yrdch8ucwyoa.jpg"
      ]
    };
  }
};
</script>

<style scoped lang="scss" >
section {
  h1 {
    color: white;
    text-align: center;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.356);
  }
  .home-page-titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    h1{
      font-size:90px;
    }
    h1.slogan{
      font-size: 70px;
      margin: 10px auto;
    }
  }
  a {
    text-decoration: none;
    color: #fff;
    font-size: 3rem;
    justify-self: flex-end;
    position: absolute;
    bottom: 20px;
    left: 50%;
  }
  #backgroundDiv {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  #backgroundMessage {
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    background: linear-gradient(
      to bottom,
      #00000082 0%,
      rgba(26, 26, 26, 0.57) 30%,
      rgba(0, 0, 0, 0) 84%,
      rgba(255, 255, 255, 0.02) 100%
    );
  }
  #backgroundMessage {
    color: white;
    z-index: 99;
  }
  img {
    width: 100vw;
    height: 90vh;
    object-fit: cover;
  }
  .blank {
    position: absolute;
    width: 100vw;
    height: 10vh;
    background-color: #f6f6f6;
    bottom: 0;
  }
  @media only screen and (min-width: 600px) {
    #backgroundMessage h1 {
      color: #ffffff;
      text-align: center;
    }
  }
  @media only screen and (max-width: 600px) {
    #backgroundMessage h1 {
      font-size: 60px;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>
