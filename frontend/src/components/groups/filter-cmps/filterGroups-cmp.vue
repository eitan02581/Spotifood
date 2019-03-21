<template>
  <section>
    <div class="filter-container">
      <form>
        <selectEl @selectedVals="onSelectedVals"></selectEl>
        <dateSuggestions></dateSuggestions>
      </form>
    </div>
  </section>
</template>

<script>
import selectEl from "./selectElmentIo.vue";
import dateSuggestions from "./date-suggestion-filter.cmp.vue";
export default {
  components: {
    selectEl,
    dateSuggestions
  },
  data() {
    return {
      filterBy: {
        searcInput: []
      }
    };
  },
  methods: {
    onSelectedVals(selectedVals) {
      this.filterBy.searcInput = [...selectedVals];
      console.log(this.filterBy.searcInput);
    }
  },
  watch: {
    filterBy: {
      deep: true,
      handler(newVal, oldVal) {
        this.$emit("filter", this.filterBy);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.filter-container {
  min-width: 210px;
}
</style>
