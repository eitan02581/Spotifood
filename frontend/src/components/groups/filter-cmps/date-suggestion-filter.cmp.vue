<template>
  <el-autocomplete
    class="inline-input"
    v-model="state1"
    :fetch-suggestions="querySearch"
    placeholder="When?"
    @select="handleSelect"
  ></el-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      links: [],
      state1: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.links;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return link => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return [
        { value: "Today" },
        { value: "This Week" },
        { value: "This Month" }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.links = this.loadAll();
  }
};
</script>

<style>
</style>
