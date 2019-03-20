<template>
  <section>
    <div class="filter-container">
      <FilterGroup></FilterGroup>
    </div>
    <div class="list-container">
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
import FilterGroup from "./filter-cmps/filterGroups-cmp.vue";
export default {
  props: {
    groups: {
      type: Array,
      required: true,
      default: function() {
        return "EMPTY";
      }
    }
  },
  components: {
    GroupPreview,
    FilterGroup
  }
};
</script>

<style scoped lang="scss">
section {
  .group-preview-wrapper {
    display: inline-block;
  }
}
</style>
