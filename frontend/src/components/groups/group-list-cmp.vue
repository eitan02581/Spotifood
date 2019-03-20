<template>
  <section>
    <div class="list-container">
      {{groups}}
      <GroupPreview></GroupPreview>
    </div>
  </section>
</template>

<script>
import GroupPreview from "./group-preview-cmp.vue";
export default {
  props: {
    groups: {
      type: Array,
      //   required: true,
      default: function() {
        return "EMPTY";
      }
    }
  },
  components: {
    GroupPreview
  }
};
</script>

<style>
</style>
