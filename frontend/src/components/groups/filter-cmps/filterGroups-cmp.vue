<template>
  <section>
    <div class="filter-container">
      <form>
        <eventSelect @eventType="onSelectedVals"></eventSelect>
        <cuisineSelect @cuisine="onSelectedVals"></cuisineSelect>
        <guestsSelect @guests="onSelectedVals"></guestsSelect>
        <dateSuggestions></dateSuggestions>
        <selectEl @selectedVals="onSelectedVals"></selectEl>
      </form>
    </div>
  </section>
</template>

<script>
import selectEl from "./selectElmentIo.vue";
import dateSuggestions from "./date-suggestion-filter.cmp.vue";
import guestsSelect from "./guests-select-cmp";
import eventSelect from "./event-select-cmp.vue";
import cuisineSelect from "./cuisine-select-cmp.vue";
export default {
  components: {
    selectEl,
    dateSuggestions,
    guestsSelect,
    eventSelect,
    cuisineSelect
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
  form {
    display: flex;
  }
  min-width: 210px;
}
</style>
