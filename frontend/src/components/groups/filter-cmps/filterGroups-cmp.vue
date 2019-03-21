<template>
  <section>
    <div class="filter-container">
      <form>
        <selectEl @selectedVals="onSelectedVals"></selectEl>
      </form>
    </div>
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
    // onSelectedVals(selectedVals) {
    // this.filterObj.type = selectedVals;
    // console.log(selectedVals);
    // }
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

<style scoped lang="scss">
.filter-container {
  height: 100vh;
  background-color: aquamarine;
}
</style>
