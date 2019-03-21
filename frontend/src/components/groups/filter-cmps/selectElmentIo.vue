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
  </section>
</template>

<script>
export default {
  data() {
    return {
      options5: [
        {
          value: "sprint 3"
        },
        {
          value: "test"
        }
      ],
      value10: []
    };
  },
  methods: {
    onSave() {
      this.$emit("selectedVals", this.value10);
    }
  }
};
</script>


