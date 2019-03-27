<template>
  <section id="howItWorksId">
    <div class="how-it-works-wrapper">
      <div class="item-container">
        <!-- <div data-aos="fade-right" data-aos-duration="900" class="item-container"> -->
        <h1>Discover People</h1>
        <img src="../../assets/New folder/globos.svg" alt>
        <h3>… and never eat alone</h3>
      </div>
      <div class="item-container">
        <!-- <div data-aos="fade-up" data-aos-duration="900" class="item-container"> -->
        <h1>Attend Event</h1>
        <img src="../../assets/New folder/calender.svg" alt>
        <h3>… and find delicious food</h3>
      </div>
      <div class="item-container">
        <!-- <div data-aos="fade-left" data-aos-duration="900" class="item-container"> -->
        <h1>Enjoy</h1>
        <img src="../../assets/New folder/cheers.svg" alt>
        <h3 style="    padding: 0 0 20px 0;
">
          ... and experience
          <!-- … and experience the magic of -->
          <span style="color:red">
            <span style="font-size:28px;">W</span>Eat
          </span>
        </h3>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.how-it-works-wrapper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  @media only screen and (min-width: 600px) {
    .item-container {
      text-align: center;
      margin: 0 30px 0 30px;
      min-width: 250px;
      background: white;
      opacity: 1;
      /* border: 1px solid wheat; */
      border-radius: 7px;
      transition: 0.1s;
      h1 {
        font-size: 25px;
        color: #f44336;
      }
      h3 {
        font-size: 18px;
        color: grey;
      }
      img {
        width: 150px;
      }
    }
    .item-container:hover {
      -webkit-box-shadow: 0px 0px 161px -50px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 161px -50px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 0px 161px -50px rgba(0, 0, 0, 0.75);
    }
  }
}
@media only screen and (max-width: 600px) {
  .item-container {
    text-align: center;
    min-width: 250px;
    margin: 30px;
    background: white;
    opacity: 1;
    /* border: 1px solid wheat; */
    border-radius: 7px;
    transition: 0.1s;
    h1 {
      font-size: 25px;
      color: #f44336;
    }
    h3 {
      font-size: 18px;
      color: grey;
    }
    img {
      width: 150px;
    }
  }
}
</style>
