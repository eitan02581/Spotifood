<template>
  <section>
    <div class="input-container">
      <input @keyup="onTitle" placeholder="Type Title" v-model="title">
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    onTitle() {
      //   setTimeout(() => {

      this.$emit("title", this.title);
      //   }, 500);
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
}
</style>
