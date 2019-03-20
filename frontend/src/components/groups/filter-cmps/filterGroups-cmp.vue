<template>
  <section>
    <form>
      <label>Search by name</label>
      <!-- the normal input -->
      <!-- <input v-model="filterObj.name" placeholder="Enter name"> -->
      <selectEl @selectedVals="onSelectedVals"></selectEl>
      <label>In stock?</label>
      <el-select placeholder="Search By Place" v-model="filterObj.inStock">
        <el-option value="All">ALL</el-option>
        <el-option value="true">In stock</el-option>
        <el-option value="false">Out of stock</el-option>
      </el-select>

      <label>Choose type</label>
      <el-select placeholder="Search By User" v-model="filterObj.type">
        <el-option value="All">ALL</el-option>
        <el-option value="Adult">Adult</el-option>
        <el-option value="Educational">Educational</el-option>
        <el-option value="Funny">Funny</el-option>
      </el-select>

      <label>Sort By</label>
      <el-select placeholder="Search By Hastags" v-model="filterObj.sortBy">
        <el-option value="name">Name</el-option>
        <el-option value="price">Price</el-option>
      </el-select>
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
      filterObj: {
        name: "",
        inStock: null,
        type: null,
        sortBy: "Name"
      }
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
