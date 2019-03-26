<template>
  <section>
    <el-select
      v-model="value10"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Search Groups"
      @change="onSave"
    >
      <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <button v-if="value10.length >=1" @click="clearSelect" class="delete">X</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      options5: [
        {
          value: "Wedding"
        },
        {
          value: "Bistro"
        }
      ],
      value10: []
    };
  },
  methods: {
    onSave() {
      this.$emit("selectedVals", this.value10);
    },
    clearSelect() {
      this.value10 = [];
      this.onSave();
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  display: inline-block;
  .delete {
    height: 40px;
    background-color: #eaecf0;
    border: none;
    cursor: pointer;
    color: white;
  }
}
</style>



