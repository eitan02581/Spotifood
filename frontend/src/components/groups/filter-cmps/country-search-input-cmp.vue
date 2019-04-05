<template>
  <section>
    <div class="input-container">
      <input @keyup="onCountry" placeholder="Type Country" v-model="country">
      <button v-if="country.length >=1" @click="clearSelect" class="clear-btn">X</button>
    </div>
  </section>
</template>

<script>
import { eventBus, CLEAR_FILEDS } from "../../../services/EventBusService.js";

export default {
  data() {
    return {
      country: ""
    };
  },
  created() {
    eventBus.$on("CLEAR_FILEDS", () => {
      this.country = "";
    });
  },
  methods: {
    onCountry() {
      setTimeout(() => {
        this.$emit("country", this.country);
      }, 500);
    },
    clearSelect() {
      this.country = "";
      this.onCountry();
    }
  }
};
</script>
<style lang="scss" scoped>
input {
  width: 212px;

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
  // width: 100%;
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

@media only screen and (min-width: 600px) and (max-width: 900px) {
  input {
    padding-left: 0px;
    font-size: 13px;
    width: 100px;
  }
}
</style>
