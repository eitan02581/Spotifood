<template>
  <section>
    <el-select @change="onSave" v-model="value" placeholder="Event Type">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <button v-if="value.length >=1" @click="clearSelect" class="clear-btn">X</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "Breakfast"
        },
        {
          value: "Brunch"
        },
        {
          value: "Lunch"
        },
        {
          value: "Dinner"
        }
      ],
      value: ""
    };
  },
  methods: {
    onSave() {
      this.$emit("eventType", this.value);
    },
    clearSelect() {
      this.value = "";
      this.onSave();
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
}
</style>
