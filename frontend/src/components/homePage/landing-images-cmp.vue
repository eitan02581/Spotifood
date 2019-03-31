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
          <h1 class="spacer">
            Join
            <span style="color:red">
              <span style="font-size:124px ; padding:0">W</span>Eat
            </span> Experience
          </h1>
                    <a href="#" v-scroll-to="'#element'"><i class="fas fa-chevron-circle-down"></i></a>

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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 90px;
    color: white;
    text-align: center;
  }
  // .main-img {
  //   width: 100%;
  //   height: 100vh;
  //   background-image: url("../../assets/table.jpg");
  //   background-position: center;
  //   background-repeat: no-repeat;
  //   background-size: cover;
  // }
  #backgroundDiv {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  // #backgroundBlock {
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
  // video {
  //   min-width: 100%;
  //   min-height: 100%;

  //   /* Setting width & height to auto prevents the browser from stretching or squishing the video */
  //   width: auto;
  //   height: auto;

  //   /* Center the video */
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  // }
  // }

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
  #backgroundMessage * {
    padding: 0.4em;
    margin: 0;
  }
  #backgroundMessage {
    // text-shadow: 2px 2px 2px #000000;
    color: white;
    z-index: 99;
        a{
      text-decoration:none;
      color: #fff;
      font-size: 3rem;
      margin: 0 auto;
      display:flex;
      flex-direction:column;
        justify-content: flex-end;
        }
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
      font-size: 7em;
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
