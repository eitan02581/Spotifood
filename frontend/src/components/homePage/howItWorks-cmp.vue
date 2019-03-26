<template>
  <section>
    <div class="how-it-works-wrapper">
      <div data-aos="fade-right" class="item-container">
        <h1>Discover People</h1>
        <img src="../../assets/New folder/globos.svg" alt>
        <h3>… and never eat alone</h3>
      </div>
      <div data-aos="fade-up" class="item-container">
        <h1>Attend Event</h1>
        <img src="../../assets/New folder/calender.svg" alt>
        <h3>… and find delicious food</h3>
      </div>
      <div data-aos="fade-left" class="item-container">
        <h1>Enjoy</h1>
        <img src="../../assets/New folder/cheers.svg" alt>
        <h3>
          … and experience the magic of
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
  .item-container {
    text-align: center;
    margin: 0 30px 0 30px;
    min-width: 250px;

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
