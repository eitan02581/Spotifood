<template>
  <section>
    <form>
      <label>Search</label>
      <!-- the normal input -->
      <!-- <input v-model="filterObj.name" placeholder="Enter name"> -->
      <selectEl @selectedVals="onSelectedVals"></selectEl>
    </form>
  </section>
</template>

<script>
import selectEl from "./selectElmentIo.vue";
export default {
  components: {
    selectEl
  },
  data() {
    return {
      searcInput
    };
  },
  methods: {
    onSelectedVals(selectedVals) {
      // this.filterObj.type = selectedVals;
      // console.log(selectedVals);
    }
  },
  watch: {
    // filterObj: {
    //   deep: true,
    //   handler(newVal, oldVal) {
    //     this.$emit("filter", newVal);
    //   }
    // }
  }
};
</script>

<style>
</style>
