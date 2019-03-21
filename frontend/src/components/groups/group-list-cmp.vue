<template>
  <section>
    <div v-if="!isHomePage" class="filter-container">
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
  },
  data() {
    return {
      isHomePage: false
    };
  },
  created() {
    this.$route.fullPath === "/"
      ? (this.isHomePage = true)
      : (this.isHomePage = false);
  }
};
</script>

<style scoped lang="scss">
section {
  margin-top: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  .list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 75%;
  }
  .group-preview-wrapper {
    display: inline-block;
  }
}
</style>
