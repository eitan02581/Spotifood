<template>
  <section>
    <el-select @change="onSave" v-model="value" placeholder="Cuisine Type">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <button v-if="value.length >=1" @click="clearSelect" class="clear-btn">X</button>
  </section>
</template>

<script>
import { eventBus, CLEAR_FILEDS } from "../../../services/EventBusService.js";

export default {
  data() {
    return {
      options: [
        {
          value: "Israeli"
        },
        {
          value: "French"
        },
        {
          value: "Italian"
        },
        {
          value: "British"
        },
        {
          value: "Vietnamese"
        },
        {
          value: "Chinese"
        },
        {
          value: "Indian"
        },
        {
          value: "Other"
        }
      ],
      value: ""
    };
  },
  created() {
    eventBus.$on("CLEAR_FILEDS", () => {
      this.value = '';
    });
  },
  methods: {
    onSave() {
      this.$emit("cuisine", this.value);
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