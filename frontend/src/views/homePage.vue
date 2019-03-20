<template>
  <section>
    <div class="video-container">
      <Landing-video></Landing-video>
    </div>
    <div class="groups-container">
      <GroupPreview></GroupPreview>
    </div>
  </section>
</template>

<script>
import LandingVideo from "../components/homePage/landing-video-cmp";
import GroupPreview from "../components/groups/group-preview-cmp";
export default {
  components: {
    LandingVideo,
    GroupPreview
  }
};
</script>

<style scoped lang="scss">
section {
  width: 100%;
  min-height: 100vh;
}
</style>
