<template>
  <section>
    <div class="video-container">
      <Landing-video></Landing-video>
    </div>
    <div class="how-it-works">
      <HowItWorks></HowItWorks>
    </div>
    <div class="group-container">
      <GroupPreview></GroupPreview>
      <GroupPreview></GroupPreview>
      <GroupPreview></GroupPreview>
      <GroupPreview></GroupPreview>
      <GroupPreview></GroupPreview>
      <GroupPreview></GroupPreview>
      <GroupPreview></GroupPreview>
      <GroupPreview></GroupPreview>
    </div>
  </section>
</template>

<script>
import LandingVideo from "../components/homePage/landing-video-cmp.vue";
import GroupPreview from "../components/groups/group-preview-cmp.vue";
import HowItWorks from "../components/homePage/howItWorks-cmp.vue";

export default {
  components: {
    LandingVideo,
    GroupPreview,
    HowItWorks
  }
};
</script>

<style scoped lang="scss">
section {
  // width: 100%;
  // min-height: 100vh;
  .group-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // max-width: 1200px;
  }
}
</style>
