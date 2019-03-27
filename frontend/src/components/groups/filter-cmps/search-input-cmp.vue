<template>
  <section>
    <div class="input-container">
      <input @keyup="onTitle" placeholder="Type Title" v-model="title">
      <button v-if="title.length >=1" @click="clearSelect" class="clear-btn">X</button>
    </div>
  </section>
</template>

<script>
import { eventBus, CLEAR_FILEDS } from "../../../services/EventBusService.js";

export default {
  data() {
    return {
      title: ""
    };
  },created() {
    eventBus.$on("CLEAR_FILEDS", () => {
      this.title = '';
    });
  },
  methods: {
    onTitle() {
      setTimeout(() => {
        this.$emit("title", this.title);
      }, 500);
    },
    clearSelect() {
      this.title = "";
      this.onTitle();
    }
  }
};
</script>
<style lang="scss" scoped>
input {
  -webkit-appearance: none;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.input-container {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  display: flex;
}

.el-range-editor.is-active,
.el-range-editor.is-active:hover,
.el-select .el-input.is-focus .el-input__inner {
  height: 40px;
}
</style>
