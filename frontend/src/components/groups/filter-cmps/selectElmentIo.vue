<template>
  <section>
    <el-select
      v-model="value10"
      multiple
      filterable
      default-first-option
      placeholder="Choose tags for your article"
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
          value: "All",
          label: "All"
        },
        {
          value: "Adult",
          label: "Adult"
        },
        {
          value: "Educational",
          label: "Educational"
        },
        {
          value: "Funny",
          label: "Funny"
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