<template>
  <section>
    <div class="video-container">
      <landing-video></landing-video>
    </div>
  </section>
</template>

<script>
import landingVideo from "../components/homePage/landing-video-cmp.vue";
export default {
  components: {
    landingVideo
  }
};
</script>

<style scoped lang="scss">
section {
  width: 100%;
  background-color: blue;
}
</style>
