<template>
  <section>
    <div :class="{'filter-container':true , anim: isOpen }">
      <form>
        <searchTitle @title="onSelectedVals('title' , $event)"></searchTitle>
        <countrySearch @country="onSelectedVals('country' , $event)" ></countrySearch>
        <eventSelect @eventType="onSelectedVals('eventType' ,  $event)"></eventSelect>
        <cuisineSelect @cuisine="onSelectedVals('cuisineType' ,  $event)"></cuisineSelect>
        <guestsSelect @guests="onSelectedVals('guests' ,  $event)"></guestsSelect>
        <!-- <dateSuggestions></dateSuggestions> -->
        <selectEl @selectedVals="onSelectedVals('hashtags' ,  $event)"></selectEl>
        <div class="clear-container">
          <button @click.prevent="clearAll" class="clear-btn">Clear All</button>
        </div>
      </form>
      <h1></h1>
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
import countrySearch from "./country-search-input-cmp";

import {
  eventBus,
  CLEAR_FILEDS,
  FILTER_BY
} from "../../../services/EventBusService.js";

export default {
  name: "filterGroup",
  components: {
    selectEl,
    dateSuggestions,
    guestsSelect,
    eventSelect,
    cuisineSelect,
    searchTitle,countrySearch
  },
  data() {
    return {
      filterBy: {
        hashtags: [],
        cuisineType: "",
        eventType: "",
        guests: null,
        title: "",
        country:""
      },
      isOpen: false
    };
  },
  created() {
    var homeFilter = this.$store.getters.getHomePageFitler;
<<<<<<< HEAD
    if (homeFilter) {
      this.onSelectedVals(homeFilter.filterBy, homeFilter.val, true);
    }
=======
    if (homeFilter) this.onSelectedVals(homeFilter.filterBy, homeFilter.val);
>>>>>>> 3fd6cdda43bb92e4a31b2853311085ecbdb441f8
  },
  methods: {
    onSelectedVals(filterBy, val, homepage) {
      if (filterBy === "hashtags") this.filterBy.hashtags = val;
      if (filterBy === "cuisineType") this.filterBy.cuisineType = val;
      if (filterBy === "eventType") this.filterBy.eventType = val;
      if (filterBy === "guests") this.filterBy.guests = val;
      if (filterBy === "title") this.filterBy.title = val;
      if (filterBy === "country") this.filterBy.country = val;
      if (!homepage) {
        this.$store.dispatch({ type: "cleanData" });
      }
    },
    clearAll() {
      eventBus.$emit("CLEAR_FILEDS");
      this.filterBy = {
        hashtags: [],
        cuisineType: "",
        eventType: "",
        guests: null,
        title: "",
        country:""
      };
    },
    onFilter() {
      this.isOpen = !this.isOpen;
    }
  },
  watch: {
    filterBy: {
      deep: true,
      handler(newVal, oldVal) {
        this.$emit("filter", this.filterBy);
      }
    }
  },
  destroyed() {
    this.$store.dispatch({ type: "cleanData" });
  }
};
</script>

<style scoped lang="scss">
@media only screen and (min-width: 600px) {
  section {
    display: flex;
  }
  .filter-ham {
    display: none;
  }
  .filter-container {
    // margin-top: -63px;
    display: flex;
    justify-content: center;
    form {
      display: flex;
    }
    min-width: 210px;
  }
}

@media only screen and (max-width: 600px) {
  section {
    display: inline-block;
  }
  .filter-ham {
    display: inline-block;
    font-size: 40px;
    color: blue;
    cursor: pointer;
    z-index: 121212;
    padding: 10px 20px 0 0;
  }
  .filter-container {
    // margin-top: -63px;
    // position: fixed;
    min-height: 200px;
    z-index: 123;
    left: 0;
    position: unset;
    // display: flex;
    // justify-content: center;
    min-width: 210px;
    left: 0;
    overflow: hidden;
    transition: 0.3s;
    z-index: 112221111;
    width: 100%;
    form {
      margin: 0 auto;
      width: 230px;
      display: flex;
      z-index: 112221111;
      justify-content: center;
      flex-wrap: wrap;
      section {
        margin-top: 20px;
      }
    }
  }
  // .filter-container {
  //   min-height: 100vh;
  //   position: fixed;
  //   z-index: 123;
  //   width: 200px;
  //   background-color: white;
  //   left: -200px;
  //   overflow: hidden;
  //   transition: 0.3s;
  // }
  .anim {
    left: 0px;
    position: unset;
  }
  .clear-btn {
    width: 200px;
    margin-top: 23px;
  }
}
</style>
