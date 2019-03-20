<template>
  <section>
    <div class="list-container">
      {{groups}}
      <div class="group-preview-wrapper" v-for="group in groups" :key="group._id">
        <router-link :to="'/groups/' + group._id">
          <GroupPreview :group="group"></GroupPreview>
        </router-link>
      </div>
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
