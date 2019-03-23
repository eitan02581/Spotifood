<template>
  <section>
    <div class="filter-container">
      <form>
        <eventSelect @eventType="onSelectedVals('eventType' ,  $event)"></eventSelect>
        <cuisineSelect @cuisine="onSelectedVals('cuisineType' ,  $event)"></cuisineSelect>
        <guestsSelect @guests="onSelectedVals('guests' ,  $event)"></guestsSelect>
        <dateSuggestions></dateSuggestions>
        <selectEl @selectedVals="onSelectedVals('hashtags' ,  $event)"></selectEl>
      </form>
    </div>
    {{filterBy}}
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
        hashtags: [],
        cuisineType: "",
        eventType: "",
        guests: null
      }
    };
  },
  methods: {
    onSelectedVals(filterBy, val) {
      if (filterBy === "hashtags") this.filterBy.hashtags = val;
      if (filterBy === "cuisineType") this.filterBy.cuisineType = val;
      if (filterBy === "eventType") this.filterBy.eventType = val;
      if (filterBy === "guests") this.filterBy.guests = val;
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
  // margin-top: -63px;

  form {
    display: flex;
  }
  min-width: 210px;
}
</style>
