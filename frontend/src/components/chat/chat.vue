<template>
  <section>
    <div class="msg-input">
      <el-input placeholder="Type a message" class="input-with-select">
        <el-button slot="append" icon="el-icon-d-arrow-right"></el-button>
      </el-input>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  margin: 100px auto;
  color: #000;
  height: 400px;
  width: 400px;
  border: 1px solid red;
  background-color: #fff;
  display: flex;
  flex-direction: column-reverse;
  .msg-input {
    // border: 1px solid black;
    input.el-input__inner {
      border-radius: none !important;
    }
  }
}
</style>
