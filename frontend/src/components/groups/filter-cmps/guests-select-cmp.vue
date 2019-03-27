<template>
  <section>
    <el-select @change="onSave" v-model="value" placeholder=" Guests">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <button v-if="value" @click="clearSelect" class="clear-btn">X</button>
  </section>
</template>

<script>
import { eventBus, CLEAR_FILEDS } from "../../../services/EventBusService.js";

export default {
  data() {
    return {
      options: [
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        },
        {
          value: 6
        },
        {
          value: 7
        },
        {
          value: 8
        },
        {
          value: 9
        },
        {
          value: 10
        },
        {
          value: 11
        },
        {
          value: 12
        },
        {
          value: 13
        },
        {
          value: 14
        },
        {
          value: 15
        }
      ],
      value: ""
    };
  },
  methods: {
    onSave() {
      this.$emit("guests", this.value);
    },
    clearSelect() {
      this.value = "";
      this.onSave();
    }
  },
  created() {
    eventBus.$on("CLEAR_FILEDS", () => {
      this.value = "";
    });
  }
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
}
</style>