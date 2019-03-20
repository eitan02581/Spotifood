<template>
  <section>
    <div class="video-container">
      <Landing-video></Landing-video>
    </div>

    <div class="recipes-container">
      <RecipePreview></RecipePreview>
      <RecipePreview></RecipePreview>
      <RecipePreview></RecipePreview>
      <RecipePreview></RecipePreview>
      <RecipePreview></RecipePreview>
      <RecipePreview></RecipePreview>
      <RecipePreview></RecipePreview>
      <RecipePreview></RecipePreview>
    </div>
  </section>
</template>

<script>
import LandingVideo from "../components/homePage/landing-video-cmp.vue";
import RecipePreview from "../components/recipes/recipe-preview-cmp.vue";
export default {
  components: {
    LandingVideo,
    RecipePreview
  }
};
</script>

<style scoped lang="scss">
section {
  // width: 100%;
  // min-height: 100vh;
  .recipes-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // max-width: 1200px;
  }
}
</style>
