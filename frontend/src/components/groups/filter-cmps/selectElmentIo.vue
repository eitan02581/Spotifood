<template>
  <section>
    <div class="hash-container">
      <el-select
        v-model="value10"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="Search Groups"
        @change="onSave"
      >
        <el-option
          v-for="item in options5"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <button v-if="value10.length >=1" @click="clearSelect" class="delete">X</button>
    </div>
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
  .hash-container {
    .input {
      height: 40px;
      overflow: scroll;
    }
    display: flex;
    .delete {
      height: unset;
      background-color: #eaecf0;
      border: none;
      cursor: pointer;
      color: white;
      padding: 0 3px 0 3px;
      transition: 0.3s;
    }
    .delete:hover {
      background-color: #74819e;
    }
  }
}
</style>



