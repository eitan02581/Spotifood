<template>
  <section>
    <div class="filter-container">
      <form>
        <searchTitle @title="onSelectedVals('title' , $event)"></searchTitle>
        <eventSelect @eventType="onSelectedVals('eventType' ,  $event)"></eventSelect>
        <cuisineSelect @cuisine="onSelectedVals('cuisineType' ,  $event)"></cuisineSelect>
        <guestsSelect @guests="onSelectedVals('guests' ,  $event)"></guestsSelect>
        <!-- <dateSuggestions></dateSuggestions> -->
        <selectEl @selectedVals="onSelectedVals('hashtags' ,  $event)"></selectEl>
        <button @click="clearAll" class="clear-btn">Clear All</button>
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
import searchTitle from "./search-input-cmp";

import { eventBus, CLEAR_FILEDS } from "../../../services/EventBusService.js";

export default {
  components: {
    selectEl,
    dateSuggestions,
    guestsSelect,
    eventSelect,
    cuisineSelect,
    searchTitle
  },
  data() {
    return {
      filterBy: {
        hashtags: [],
        cuisineType: "",
        eventType: "",
        guests: null,
        title: ""
      }
    };
  },
  methods: {
    onSelectedVals(filterBy, val) {
      if (filterBy === "hashtags") this.filterBy.hashtags = val;
      if (filterBy === "cuisineType") this.filterBy.cuisineType = val;
      if (filterBy === "eventType") this.filterBy.eventType = val;
      if (filterBy === "guests") this.filterBy.guests = val;
      if (filterBy === "title") this.filterBy.title = val;
    },
    clearAll() {
      eventBus.$emit("CLEAR_FILEDS");
      this.filterBy = {
        hashtags: [],
        cuisineType: "",
        eventType: "",
        guests: null,
        title: ""
      };
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
  display: flex;
  justify-content: center;
  form {
    display: flex;
  }
  min-width: 210px;
}
</style>
