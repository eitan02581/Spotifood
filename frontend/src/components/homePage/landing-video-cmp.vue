<template>
  <section>
    <!-- <h1>Join WEat Experience</h1>
    <div class="main-img"></div>
    <video src></video>-->
    <div id="videoDiv">
      <div id="videoBlock">
        <video style preload="preload" id="video" autoplay="autoplay" loop="loop">
          <source src="../../assets/People-Eating-Out.mp4" type="video/webm">
          <source src="../../assets/Group-Music.mp4" type="video/webm">
        </video>
        <div id="videoMessage">
          <h1 class="spacer">
            Join
            <span style="color:red">
              <span style="font-size:124px ; padding:0">W</span>Eat
            </span> Experience
          </h1>
        </div>
        <a class="ct-btn-scroll ct-js-btn-scroll" v-scroll-to="'#howItWorksId'" href="#">
          <img alt="Arrow Down Icon" src="../../assets/arrow-down.png">
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
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
  .main-img {
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/table.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  #videoDiv {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  #videoBlock {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    video {
      min-width: 100%;
      min-height: 100%;

      /* Setting width & height to auto prevents the browser from stretching or squishing the video */
      width: auto;
      height: auto;

      /* Center the video */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  #videoMessage {
    width: 100%;
    height: 100%;
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
  #videoMessage * {
    padding: 0.4em;
    margin: 0;
  }
  #videoMessage {
    // text-shadow: 2px 2px 2px #000000;
    color: white;
    z-index: 99;
  }
  #videoMessage h1 {
    font-size: 7em;
    color: #ffffff;
    text-align: center;
  }
  .ct-btn-scroll {
    width: 49px;
    height: 49px;
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: 120px auto;
    padding-top: 500px;
    z-index: 9999;
    border-radius: 50%;
    -webkit-transition: background-color 0.25s ease-in-out;
    transition: background-color 0.25s ease-in-out;
    :hover{
      background-color: rgba(128, 128, 128, 0.486);
    border-radius: 50%;
    }
  }
}
</style>
