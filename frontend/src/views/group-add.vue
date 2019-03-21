<template>
  <section class="add-group-form">
    <el-steps :active="active" finish-status="success">
      <el-step title="Step 1"></el-step>
      <el-step title="Step 2"></el-step>
      <el-step title="Step 3"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px;" @click="next">Next step</el-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
section.add-group-form {
  width: 80%;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 10px;
}
</style>
