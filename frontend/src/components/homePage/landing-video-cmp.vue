<template>
  <section>
    <h1>Join WEat Experience</h1>
    <div class="main-img"></div>
    <video src></video>
  </section>
</template>

<script>
export default {};
</script>

<style scoped lang="scss" >
section {
  h1 {
    font-family: "Cormorant Garamond";

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
}
</style>
